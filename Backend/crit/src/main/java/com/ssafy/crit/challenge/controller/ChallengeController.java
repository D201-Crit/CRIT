package com.ssafy.crit.challenge.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.challenge.dto.ChallengeCreateRequestDto;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.challenge.entity.ChallengeUser;
import com.ssafy.crit.challenge.service.ChallengeService;
import com.ssafy.crit.message.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.swing.text.html.parser.Entity;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @PostMapping("/create")
    public Response<String> createChallenge(@RequestBody ChallengeCreateRequestDto requestDto,
                                            HttpServletRequest httpServletRequest) {
        User user = getUser(httpServletRequest);
        Challenge challenge = challengeService.createChallenge(requestDto, user);
        log.info("Challenge Is OK");
        challenge.getChallengeUserList().add(new ChallengeUser(user, challenge));
//        challengeService.joinChallenge(challenge.getId(), user);
        return new Response<>("success", "챌린지 생성 성공", "성공");


    }

    @PostMapping("/join/{challengeId}")
    public ResponseEntity<Response<String>> joinChallenge(@PathVariable("challengeId") Long challengeId, HttpServletRequest httpServletRequest){
        User user = getUser(httpServletRequest);
        challengeService.joinChallenge(challengeId, user);
        return new ResponseEntity<>(new Response<>("suceess", "챌린지 참여 성공", ""), HttpStatus.OK);


    }



    private User getUser(HttpServletRequest httpServletRequest) {
        String header = httpServletRequest.getHeader("Authorization");
        String bearer = header.substring(7);
        String userId = (String) jwtProvider.get(bearer).get("userId");

        User user = userRepository.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("유저 ID를 찾을수 없습니다.");
        });
        return user;
    }
}
