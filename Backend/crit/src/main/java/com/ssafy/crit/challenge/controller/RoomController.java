package com.ssafy.crit.challenge.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.challenge.service.RoomService;
import com.ssafy.crit.common.util.UserTokenUtil;
import com.ssafy.crit.message.response.Response;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 230713 WebRTC 방 제어 컨트롤러 by 조경호
 */

@RestController
@Slf4j
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

    private final UserTokenUtil userTokenUtil;
    private final RoomService roomService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openVidu;

    @PostConstruct
    public void init() {
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
    // OpenVidu 객체 초기화


    // 세션 방 만들기
    @PostMapping("/sessions")
    public ResponseEntity<Response<String>> initializeSession(@RequestBody(required = false) Map<String, Object> params, HttpServletRequest httpServletRequest) throws Exception {
        User user = userTokenUtil.getUser(httpServletRequest);
        String sessionId = roomService.initializeSession(user, params, openVidu);
        log.info("세션 생성 완료!!! {}", sessionId);
        return new ResponseEntity<>(new Response<>("success", "세션 생성 성공", sessionId), HttpStatus.OK);
        // 세션 아이디 반환
    }

    // 방 토큰 얻기
    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<Response<String>> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params, HttpServletRequest httpServletRequest)
            throws Exception {
        User user = userTokenUtil.getUser(httpServletRequest);
        log.info("룸 진입 전");
        String token = roomService.createConnection(user, openVidu, sessionId, params);
        log.info("OKOKOK, token : {}", token);
        return new ResponseEntity<>(new Response<>("success", "커넥션 맺기 성공", token), HttpStatus.OK);
        // 토큰 반환
    }





}
