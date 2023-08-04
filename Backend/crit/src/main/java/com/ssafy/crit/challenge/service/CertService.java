package com.ssafy.crit.challenge.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.challenge.dto.CertImgRequestDto;
import com.ssafy.crit.challenge.dto.CertVideoRequestDto;
import com.ssafy.crit.challenge.entity.Cert;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.challenge.entity.ChallengeUser;
import com.ssafy.crit.challenge.entity.IsCert;
import com.ssafy.crit.challenge.repository.ChallengeRepository;
import com.ssafy.crit.challenge.repository.ChallengeUserRepository;
import com.ssafy.crit.challenge.repository.IsCertRepository;
import com.ssafy.crit.common.exception.BadRequestException;
import com.ssafy.crit.common.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * 230801 조경호
 * 인증 서비스
 * */

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CertService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeUserRepository challengeUserRepository;
    private final IsCertRepository isCertRepository;
    private final S3Uploader s3Uploader;

    public IsCert imgCertification(CertImgRequestDto requestDto, User user, MultipartFile file) throws Exception {
        if(!checkExtension(file)) throw new BadRequestException("이미지 형식이 아닙니다.");

        Challenge challenge = isChallenge(requestDto.getChallengeId(), Cert.PHOTO, user);

        // 이미지 정보 확인 -> 챌린지 시작 시간이랑 사진 시간이랑 비교 -> (X)
        // 사진 올린 시간과 현재 시간을 비교

        if (Math.abs(Duration.between(LocalTime.now(), challenge.getStartTime()).getSeconds()) > 605) { // 시작 시간이랑  10분이상 차이나는 경우
            throw new BadRequestException("잘못된 시간에 인증을 요청하였습니다.");
        }

        // 올바르게 올린경우 사진 저장
        String uploadImgPath = s3Uploader.uploadFiles(file, "cert/img");


        IsCert isCert = todayChallengeIsCert(challenge, user);

        isCert.certification(true); // 인증 완료로 설정

        isCertRepository.save(isCert);

        return isCert;

    }


    public IsCert videoCertification(CertVideoRequestDto requestDto, User user) throws Exception {
        Challenge challenge = isChallenge(requestDto.getChallengeId(), Cert.WEBRTC, user);
        // 이탈시간
        // 초단위로 보내줌
        long outTime = requestDto.getOutTime();
        LocalTime startTime = challenge.getStartTime();
        LocalTime endTime = challenge.getEndTime();
        // 챌린지 끝나고 나서
        long seconds = Duration.between(startTime, endTime).toSeconds();

        LocalTime absentTime = LocalTime.ofSecondOfDay(outTime); // 부재 시간
        LocalTime presenceTime = LocalTime.ofSecondOfDay(seconds - outTime); // 자리에 있었던 시간
        log.info("seconds : {}", seconds);
        log.info("absent Time : {}", absentTime);
        long presencePercentage = outTime/seconds * 100; // 자리에 앉아있는 비율
        log.info("presencePercentage : {}", presencePercentage);

        IsCert isCert = todayChallengeIsCert(challenge, user);

        isCert.setOutTime(absentTime);
        isCert.setPresenceTime(presenceTime);
        isCert.setPercentage((int) presencePercentage);

        if(presencePercentage >= 85){ // 85퍼센트 이상이면 인증
            isCert.certification(true);
        }

        return isCertRepository.save(isCert);
        // 참여시간 미참여시간, 퍼센테이지 반환

    }

    private IsCert todayChallengeIsCert(Challenge challenge, User user) {
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now().minusDays(1), LocalTime.of(1,0,0));
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59));
        return isCertRepository.findByChallengeAndUserAndCertTimeBetween(challenge, user, startDatetime, endDatetime)
                .orElseThrow(() -> new BadRequestException("해당 챌린지의 인증을 찾을 수 없습니다."));

    }


    public List<IsCert> getIsCertList(Long challengeId, User user) {
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(
                () -> new BadRequestException("해당 챌린지를 찾을 수 없습니다."));

        // 유저가 챌린지 참여중인지 확인
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeAndUser(challenge, user).orElseThrow(
                () -> new BadRequestException("해당 챌린지에 참여 중이지 않습니다."));

        return isCertRepository.findAllByChallengeAndUser(challenge, user);
    }


    // 날마다 챌린지 인증을 넣기
    @Transactional(propagation= Propagation.REQUIRES_NEW)
    @Scheduled(cron = "0 20 * * * *")
    public void dailyInsertionIsCert() throws Exception {
        log.info("Working Scheduling");
        List<Challenge> allOngoingChallenge = challengeRepository.findAllOngoingChallenge(LocalDate.now());
        List<IsCert> insertedIsCert = new ArrayList<>();
        for(Challenge challenge : allOngoingChallenge){
            log.info("challengeId : {}", challenge.getId());

            challenge.getChallengeUserList().forEach(challengeUser -> {
                User user = challengeUser.getUser();

                IsCert isCert = IsCert.builder()
                        .challenge(challenge)
                        .isCertified(false)
                        .user(user)
                        .build();

                insertedIsCert.add(isCert);
            });
        }

        isCertRepository.saveAllAndFlush(insertedIsCert);
    }

    // 확장자 확인
    public boolean checkExtension(MultipartFile file) {
        String[] fileExtension = {"jpeg", "jpg", "png"}; // 체크할 확장자
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        return Arrays.stream(fileExtension).anyMatch(extension::equals);
    }

    
    // 챌린지 참여중인지 확인
    private Challenge isChallenge(Long challengeId, Cert cert, User user) {
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(
                () -> new BadRequestException("해당 챌린지를 찾을 수 없습니다."));

        if (challenge.getCert() != cert) throw new BadRequestException("인증 방식이 잘못 되었습니다.");

        // 유저가 챌린지 참여중인지 확인
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeAndUser(challenge, user).orElseThrow(
                () -> new BadRequestException("해당 챌린지에 참여 중이지 않습니다."));

        LocalDate now = LocalDate.now();
        // 챌린지 기간인지 확인
        if (challenge.getStartDate().isAfter(now) || challenge.getEndDate().isBefore(now)) {
            throw new BadRequestException("해당 챌린지 기간이 아닙니다.");
        }

        return challenge;
    }
}