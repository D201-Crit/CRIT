package com.ssafy.crit.challenge.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.boards.entity.Classification;
import com.ssafy.crit.boards.repository.ClassificationRepository;
import com.ssafy.crit.challenge.dto.ChallengeCreateRequestDto;
import com.ssafy.crit.challenge.entity.*;
import com.ssafy.crit.challenge.repository.ChallengeCategoryRepository;
import com.ssafy.crit.challenge.repository.ChallengeRepository;
import com.ssafy.crit.challenge.repository.ChallengeUserRepository;
import com.ssafy.crit.challenge.repository.IsCertRepository;
import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;
import com.ssafy.crit.common.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

import java.time.LocalTime;
import java.util.*;

import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j

/**
 * 230727 조경호
 * 챌린지 관련 서비스
 */
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeUserRepository challengeUserRepository;
    private final ChallengeCategoryRepository challengeCategoryRepository;
    private final ClassificationRepository classificationRepository;
    private final IsCertRepository isCertRepository;
    private final S3Uploader s3Uploader;


    public Challenge createChallenge(MultipartFile file, ChallengeCreateRequestDto challengeDto, User user) throws Exception {
        String filePath = "challenge";

        // 파일 저장 후
        ChallengeCategory category = getCategory(challengeDto);
        Challenge challenge = Challenge.builder()
                .name(challengeDto.getTitle())
                .info(challengeDto.getIntroduce())
                .challengeCategory(category)
                .cert(challengeDto.getAuthentication())
                .people(challengeDto.getMember())
                .money(challengeDto.getMoney())
                .startDate(challengeDto.getStartDate())
                .endDate(challengeDto.getEndDate())
                .startTime(LocalTime.of(challengeDto.getStartTime().getHour(), challengeDto.getStartTime().getMinute(), 0))
                .endTime(LocalTime.of(challengeDto.getEndTime().getHour(), challengeDto.getEndTime().getMinute(), 0))
                .createUser(user)
                .challengeStatus(ChallengeStatus.WAIT)
                .build();

        checkSchedule(user, challenge); // 스케줄 겹치는지 확인

        // 돈 확인
        if (!user.useCashPoint(challenge.getMoney())) {
            throw new BadRequestException(ErrorCode.INSUFFICIENT_POINT);
        }

        if (file != null) { // 사진이 존재하는 경우
            if (!checkExtension(file)) throw new BadRequestException(ErrorCode.NOT_EXISTS_CHALLENGE_IMAGE_TYPE);

            String uploadImageUrl = s3Uploader.uploadFiles(file, "challenge");
            challenge.setImg(uploadImageUrl);
        }

        try {
            Challenge result = challengeRepository.saveAndFlush(challenge);

            // 게시판 아이디
            Classification classification = Classification.builder()
                    .category("challenge_" + result.getId())
                    .build(); // 챌린지 게시판 생성
            Classification challengeBoard = classificationRepository.saveAndFlush(classification);

            result.addBoard(challengeBoard);

            ChallengeUser challengeUser = ChallengeUser.createChallengeUser(result, user); // 생성자도 챌린지 참가
            challengeUserRepository.save(challengeUser);


            return result;

        } catch (Exception e) {
            log.info(e.getMessage());
            throw new BadRequestException(ErrorCode.NOT_VALID_CHALLENGE_CERT);
        }

    }

    public Challenge joinChallenge(Long challengeId, User user) throws Exception {  // 챌린지 참여
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.NOT_EXISTS_CHALLENGE_ID));

        challenge.getChallengeUserList()
                .forEach(challengeUser -> {
                    if (challengeUser.getUser().getId().equals(user.getId())) {
                        throw new BadRequestException(ErrorCode.ALREADY_REGISTERED_CHALLENGE);
                    }
                });
        // 중복 참여 제거

        // 챌린지 스케줄 중복 여부 체크
        checkSchedule(user, challenge); // 중복된 경우 발생 시 예외 처리

        if (LocalDate.now().isBefore(challenge.getStartDate())) { // 챌린지가 시작하기 이전인 경우
//            log.info("현재 시간 : {}", LocalDate.now());
            /** 챌린지 참여 로직 */
            if (!user.useCashPoint(challenge.getMoney())) {
                throw new BadRequestException(ErrorCode.INSUFFICIENT_POINT);
            }

            ChallengeUser challengeUser = ChallengeUser.createChallengeUser(challenge, user);
            challenge.addChallengeUser(challengeUser);
            // 유저에도 추가 필요
            return challenge; // 생성 성공
        } else {
            throw new BadRequestException(ErrorCode.NOT_VALID_CHALLENGE_DATE);
        }

    }

    private void checkSchedule(User user, Challenge challenge) {
        List<Challenge> overlappedChallengeList = challengeRepository.findAllScheduledChallenge(challenge.getStartDate(),
                challenge.getEndDate(), user); // 시간 제외 일정이 겹치는 챌린지들

        for (Challenge c : overlappedChallengeList) {
            if (c.getStartTime().isBefore(challenge.getEndTime()) && c.getEndTime().isAfter(challenge.getStartTime())) {
                // 겹치는 경우
                throw new BadRequestException(ErrorCode.OVERLAPPED_CHALLENGE_REQUEST);
            }
        }
    }

    public List<Challenge> getMyChallengeAll(User user) throws Exception {
        return challengeUserRepository.findAllByUser(user).stream()
                .map(challengeUser -> challengeUser.getChallenge()).collect(Collectors.toList());
    }

    public List<Challenge> getChallengesAll() throws Exception {
        return challengeRepository.findAll();
    }

    public List<Challenge> getChallengesPlanned() throws Exception {
        return challengeRepository.findAllByStartDateBefore(LocalDate.now());
    }

    public List<Challenge> getMyChallengesPlanned(User user) throws Exception {
        List<Challenge> challengeList = new ArrayList<>();
        List<ChallengeUser> allByUser = challengeUserRepository.findAllByUser(user);
        for (ChallengeUser challengeUser : allByUser) {
            if (challengeUser.getChallenge().getStartDate().isAfter(LocalDate.now())) {
                challengeList.add(challengeUser.getChallenge());
            }
        }
        return challengeList;
    }

    public List<Challenge> getMyChallengesFinished(User user) throws Exception {
        List<Challenge> challengeList = new ArrayList<>();
        List<ChallengeUser> allByUser = challengeUserRepository.findAllByUser(user);
        for (ChallengeUser challengeUser : allByUser) {
            if (challengeUser.getChallenge().getEndDate().isBefore(LocalDate.now())) {
                challengeList.add(challengeUser.getChallenge());
            }
        }
        return challengeList;
    }

    public List<Challenge> getMyChallengesOngoing(User user) throws Exception {
        List<Challenge> challengeList = new ArrayList<>();
        List<ChallengeUser> allByUser = challengeUserRepository.findAllByUser(user);

        for (ChallengeUser challengeUser : allByUser) {
            log.info("cur : challenge: {}   user : {}", challengeUser.getChallenge().getName(), challengeUser.getUser().getId());
            if (isBeforeOrEqual(LocalDate.now(), challengeUser.getChallenge().getStartDate()) &&
                    isAfterOrEqual(LocalDate.now(), challengeUser.getChallenge().getEndDate())) {
                log.info("OK");
                challengeList.add(challengeUser.getChallenge());
            }
        }
        return challengeList;
    }

    // 현재 가능한 챌린지 불러오기
    public List<Challenge> getCahllengesAvailable() throws Exception {
        return challengeRepository.findAllByStartDateAfter(LocalDate.now());
    }

    // 끝난 챌린지 불러오기
    public List<Challenge> getChallengesFinished() throws Exception {
        return challengeRepository.findAllByEndDateBefore(LocalDate.now());
    }

    // 현재 진행중인 챌린지 불러오기
    public List<Challenge> getChallengesOngoing() throws Exception {
        return challengeRepository.findAllOngoingChallenge(LocalDate.now());
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Scheduled(cron = "0 0 0 * * *")
    public void dailyChallengeCheck() throws Exception {  // 챌린지 완성 기한에 다다른 챌린지들 체크하 고 생성하기
        // 내일 시작인 챌린지들 다 불러오기
        List<Challenge> beCreatedChallengeList = challengeRepository.findAllByStartDate(LocalDate.now().plusDays(1));
        // 어제 끝난 챌린지 불러오기
        List<Challenge> finishedChallengeList = challengeRepository.findAllByEndDate(LocalDate.now().minusDays(1));

        for (Challenge challenge : beCreatedChallengeList) { // 챌린지 보고 인원수 꽉찬거 통과
            if (challenge.getChallengeStatus() == ChallengeStatus.WAIT && // 대기 상태이고
                    challenge.getChallengeUserList().size() == challenge.getPeople()) {
                challenge.setChallengeStatus(ChallengeStatus.PROGRESS);
            } else { // 인원수 다 안차면 거절
                challenge.setChallengeStatus(ChallengeStatus.REJECT);
                refundMoney(challenge);
            }
        }

        for (Challenge challenge : finishedChallengeList) { // 끝난거 종료시키기
            if (challenge.getChallengeStatus() == ChallengeStatus.PROGRESS) { // 진행 중인거 종료 시키기
                settleChallenge(challenge); // 챌린지 정산 로직

                challenge.setChallengeStatus(ChallengeStatus.END);
            }
        }

    }

    public static void refundMoney(Challenge challenge) {
        int money = challenge.getMoney();
        challenge.getChallengeUserList().forEach(challengeUser -> {
            User user = challengeUser.getUser();
            user.addCashPoint(money);
        });
    }


    // 카테고리 있으면 불러오기, 없으면 생성
    private ChallengeCategory getCategory(ChallengeCreateRequestDto challengeDto) throws Exception {
        Optional<ChallengeCategory> challengeCategory = challengeCategoryRepository.
                findChallengeCategoryBySpecies(challengeDto.getSelect());
        ChallengeCategory category;
        if (challengeCategory.isPresent()) {
            category = challengeCategory.get();
        } else {
            category = ChallengeCategory.builder()
                    .species(challengeDto.getSelect())
                    .build();
            challengeCategoryRepository.save(category);
        }
        return category;
    }

    // 확장자 확인
    public boolean checkExtension(MultipartFile file) {
        String[] fileExtension = {"jpeg", "jpg", "png", "JPG", "JPEG", "PNG"}; // 체크할 확장자
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        return Arrays.stream(fileExtension).anyMatch(extension::equals);
    }

    public void settleChallenge(Challenge challenge) {
        log.info("========={} 챌린지 정산 시작=========", challenge.getName());
        List<User> successList = new ArrayList<>(); // 챌린지를 100퍼센트 참여한 사람들의 리스트 (자기돈 + 실패한 사람들의 돈의 sum 1/n)
        List<User> passList = new ArrayList<>(); // 챌린지를 85퍼센트 이상 참여한 사람들의 리스트 (자기 돈만 가져감)
        List<User> failList = new ArrayList<>(); // 챌린지를 85퍼센트 미만 참여한 사람들의 리스트 (돈 못받음)

        List<IsCert> isCerts = challenge.getIsCerts(); // 챌린지의 인증 목록 불러오기
        // 유저별로 인증 목록 분리
        Map<User, List<IsCert>> userIsCertList = isCerts.stream().collect(Collectors.groupingBy(isCert -> isCert.getUser()));

        for (User user : userIsCertList.keySet()) { // 유저별로 퍼센트 구분
            log.info("User : {}", user.getId());
            List<IsCert> isCertList = userIsCertList.get(user);

            int certifiedDays = (int) isCertList.stream().filter(isCert -> isCert.isCertified()).count();
            log.info("{}가 인증한 일수 : {}", user.getId(), certifiedDays);
            int totalDays = isCertList.size();
            log.info("챌린지 총 일수 : {}", totalDays);
            double percent = (double) certifiedDays / (double) totalDays * 100.0;
            log.info("참여한 퍼센트 : {}", percent);
            if (percent == 100.) { // 성공한 유저
                log.info("{} 유저 {} 챌린지 성공!!", user.getId(), challenge.getName());
                successList.add(user);
            } else if (percent >= 85.) { // 패스한 유저
                log.info("{} 유저 {} 챌린지 패스", user.getId(), challenge.getName());
                passList.add(user);
            } else { // 실패한 유저
                log.info("{} 유저 {} 챌린지 실패", user.getId(), challenge.getName());
                failList.add(user);
            }

            log.info("==========================");
        }

        int settledMoney = challenge.getMoney() * failList.size(); // 정산할 돈
        log.info("총 정산할 금액 : {}", settledMoney);

        log.info("=======챌린지를 패스한 인원들 정산=======");
        for (User user : passList) {
            log.info("유저 {}의 정산 금액: {} ", user.getId(), challenge.getMoney());
            user.challengeExp();
            user.addCashPoint(challenge.getMoney());
        }

        log.info("=======챌린지를 성공한 인원들 정산=======");
        for (User user : successList) {
            int finallyAddedMoney = settledMoney / successList.size() + challenge.getMoney();
            log.info("유저 {}의 정산 금액: {} ", user.getId(), finallyAddedMoney);
            user.challengeExp();
            user.addCashPoint(finallyAddedMoney);
        }

        log.info("========={} 챌린지 정산 종료=========", challenge.getName());

    }

    private boolean isBeforeOrEqual(LocalDate date, LocalDate compareToDate) {
        if (date == null || compareToDate == null) {
            return false;
        }
        return compareToDate.isBefore(date) || compareToDate.isEqual(date);
    }

    private boolean isAfterOrEqual(LocalDate date, LocalDate compareToDate) {
        if (date == null || compareToDate == null) {
            return false;
        }
        return compareToDate.isAfter(date) || compareToDate.isEqual(date);
    }
}
