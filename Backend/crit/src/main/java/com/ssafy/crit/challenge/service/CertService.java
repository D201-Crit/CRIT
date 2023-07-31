package com.ssafy.crit.challenge.service;

import com.ssafy.crit.auth.entity.User;
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
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CertService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeUserRepository challengeUserRepository;
    private final IsCertRepository isCertRepository;

    public IsCert imgCertification(MultipartFile file) throws Exception {
//        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(
//                () -> new BadRequestException("해당 챌린지를 찾을 수 없습니다."));

        // 유저가 챌린지 참여중인지 확인
//        ChallengeUser challengeUser = challengeUserRepository.findByChallengeAndUser(challenge, user).orElseThrow(
//                () -> new BadRequestException("해당 챌린지에 참여 중이지 않습니다."));

        // 이미지 정보 확인 -> 챌린지 시작 시간이랑 사진 시간이랑 비교

        /*우리의 프로젝트경로를 담아주게 된다 - 저장할 경로를 지정*/
//        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\cert";
        String projectPath = "C:\\upload\\cert/";
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

        log.info("saveFile 전 : {}", saveFile.getTotalSpace());
        file.transferTo(saveFile);
        log.info("saveFile 후 : {}", saveFile.getTotalSpace());



        // 다 만족하면 Cert테이블에 삽입
        return null;

    }

    private File convert(MultipartFile mfile) throws IOException {
        File file = new File(mfile.getOriginalFilename());
        file.createNewFile();
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(mfile.getBytes());
        fos.close();
        return file;
    }
}
