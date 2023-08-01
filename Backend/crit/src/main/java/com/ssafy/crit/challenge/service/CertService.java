package com.ssafy.crit.challenge.service;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.challenge.dto.CertImgRequestDto;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.challenge.entity.ChallengeUser;
import com.ssafy.crit.challenge.entity.IsCert;
import com.ssafy.crit.challenge.repository.ChallengeRepository;
import com.ssafy.crit.challenge.repository.ChallengeUserRepository;
import com.ssafy.crit.challenge.repository.IsCertRepository;
import com.ssafy.crit.common.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
/**
 * 230801 조경호
 * 인증 서비스
 * */


public class CertService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeUserRepository challengeUserRepository;
    private final IsCertRepository isCertRepository;

    public IsCert imgCertification(CertImgRequestDto requestDto, User user, MultipartFile file) throws Exception {
        Challenge challenge = challengeRepository.findById(requestDto.getChallengeId()).orElseThrow(
                () -> new BadRequestException("해당 챌린지를 찾을 수 없습니다."));

        // 유저가 챌린지 참여중인지 확인
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeAndUser(challenge, user).orElseThrow(
                () -> new BadRequestException("해당 챌린지에 참여 중이지 않습니다."));

        LocalDate now = LocalDate.now();
        // 챌린지 기간인지 확인
        if (challenge.getStartDate().isAfter(now) || challenge.getEndDate().isBefore(now)) {
            throw new BadRequestException("해당 챌린지 참여기간이 아닙니다.");
        }

        // 이미지 정보 확인 -> 챌린지 시작 시간이랑 사진 시간이랑 비교 -> (X)
        // 사진 올린 시간과 현재 시간을 비교

        if (Math.abs(Duration.between(LocalTime.now(), challenge.getStartTime()).getSeconds()) > 605) { // 시작 시간이랑  10분이상 차이나는 경우
            throw new BadRequestException("잘못된 시간에 인증을 요청하였습니다.");
        }

        // 올바르게 올린경우 사진 저장
        /*우리의 프로젝트경로를 담아주게 된다 - 저장할 경로를 지정*/
//        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\cert";
        String projectPath = "C:\\upload\\cert/";
//        String projectPath = "/home/ubuntu/cert";
        log.info(projectPath);
        /*식별자 . 랜덤으로 이름 만들어줌*/
        UUID uuid = UUID.randomUUID();
        log.info("UUID = {}", uuid);
        /*랜덤식별자_원래파일이름 = 저장될 파일이름 지정*/
        String fileName = uuid + "_" + file.getOriginalFilename();
        log.info("fileName = {}", fileName);
        /*빈 껍데기 생성*/
        /*File을 생성할건데, 이름은 "name" 으로할거고, projectPath 라는 경로에 담긴다는 뜻*/
        File saveFile = new File(projectPath, fileName);

        file.transferTo(saveFile);


        // 다 만족하면 Cert테이블에 삽입
        IsCert isCert = IsCert.builder()
                .certTime(LocalDateTime.now())
                .isCert(true)
                .filepath(projectPath)
                .filename(fileName)
                .challenge(challenge)
                .user(user)
                .build();

        isCertRepository.save(isCert);

        return isCert;

    }


    public List<IsCert> getIsCertList(Long challengeId, User user) {
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(
                () -> new BadRequestException("해당 챌린지를 찾을 수 없습니다."));

        // 유저가 챌린지 참여중인지 확인
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeAndUser(challenge, user).orElseThrow(
                () -> new BadRequestException("해당 챌린지에 참여 중이지 않습니다."));

        return isCertRepository.findAllByChallengeAndUser(challenge, user);
    }
}