package com.ssafy.crit.challenge.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.challenge.repository.ChallengeRepository;
import com.ssafy.crit.challenge.repository.ChallengeUserRepository;
import com.ssafy.crit.common.exception.BadRequestException;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoomService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeUserRepository challengeUserRepository;

    /**
     * 챌린지(WebRTC) 입장을 제공하는 서비스
     * 230803 조경호
     * */
    public String initializeSession(User user, Map<String, Object> params, OpenVidu openVidu) throws Exception {
        // 세션아이디를 가지고 챌린지 아이디 가져오기
        Object customSessionId = params.get("customSessionId");
        log.debug("customSessionId : {}", String.valueOf(customSessionId));
        String[] sessionInfo = String.valueOf(customSessionId).split("_");
        Long challengeId = Long.parseLong(sessionInfo[sessionInfo.length - 1]);
        log.debug("challenge_id : {}", challengeId);
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(
                () -> new BadRequestException("챌린지를 찾을 수 없습니다.")
        );

        // 유저가 챌린지에 참여 중인지 확인하기
        challengeUserRepository.findByChallengeAndUser(challenge, user).orElseThrow(
                () -> new BadRequestException("챌린지에 참여 중이지 않습니다.")
        );


        // 인가 된 경우 세션 만들어서 세션 아이디 돌려주기
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openVidu.createSession(properties);
        return session.getSessionId();
    }



}
