package com.ssafy.crit.challenge.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.challenge.dto.ChallengeCreateRequestDto;
import com.ssafy.crit.challenge.dto.ChallengeListResponseDto;
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
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @PostMapping("/create")
    public ResponseEntity<Response<String>> createChallenge(@RequestBody ChallengeCreateRequestDto requestDto,
                                            HttpServletRequest httpServletRequest) {
        User user = getUser(httpServletRequest);
        Challenge challenge = challengeService.createChallenge(requestDto, user);
        log.info("Challenge Is OK");
        return new ResponseEntity<>(new Response<>("success", "챌린지 만들기 성공!", "OK") ,HttpStatus.OK);
    }

    @PostMapping("/join/{challengeId}")
    public ResponseEntity<Response<String>> joinChallenge(@PathVariable("challengeId") Long challengeId, HttpServletRequest httpServletRequest){
        User user = getUser(httpServletRequest);
        challengeService.joinChallenge(challengeId, user);
        return new ResponseEntity<>(new Response<>("suceess", "챌린지 참여 성공", "OK"), HttpStatus.OK);
    }

    //이때까지 열린 모든 챌린지 불러오기
    @GetMapping("/list/all")
    public ResponseEntity<Response<List<ChallengeListResponseDto>>> listAllChallenge(){
        List<ChallengeListResponseDto> challenges = challengeService.getChallengesAll().stream()
                .map(challenge -> new ChallengeListResponseDto(challenge)).collect(Collectors.toList());

        return new ResponseEntity<>(new Response<>("success", "챌린지 불러 오기", challenges), HttpStatus.OK);
    }

//    // 현재 참여 가능한 챌린지 불러오기
//    @GetMapping("/list/available")
//    public ResponseEntity<Response<List<Challenge>>> listAvailableChallenge(){
//        List<Challenge> challenges = challengeService.get
//    }


    private User getUser(HttpServletRequest httpServletRequest) {
        String bearer = httpServletRequest.getHeader("Authorization").substring(7);
        String userId = (String) jwtProvider.get(bearer).get("userId");

        User user = userRepository.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("유저 ID를 찾을수 없습니다.");
        });
        return user;
    }
}
