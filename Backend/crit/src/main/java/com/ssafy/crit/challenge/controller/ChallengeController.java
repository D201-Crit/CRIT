package com.ssafy.crit.challenge.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.challenge.dto.ChallengeCreateRequestDto;
import com.ssafy.crit.challenge.dto.ChallengeListResponseDto;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.challenge.service.ChallengeService;
import com.ssafy.crit.message.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/***
 * 0730 조경호
 * 챌린지 각종 조회
 */

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    // 챌린지 만들기
    @PostMapping(path = "/create", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Response<String>> createChallenge(@RequestPart(value = "file", required = false) MultipartFile file, @RequestPart(value = "requestDto") ChallengeCreateRequestDto requestDto,
                                                            HttpServletRequest httpServletRequest) throws Exception {
        User user = getUser(httpServletRequest);
        challengeService.createChallenge(file, requestDto, user);
        return new ResponseEntity<>(new Response<>("success", "챌린지 만들기 성공!", "OK"), HttpStatus.OK);
    }

    // 챌린지 참여
    @PostMapping("/join/{challengeId}")
    public ResponseEntity<Response<String>> joinChallenge(@PathVariable("challengeId") Long challengeId, HttpServletRequest httpServletRequest) throws Exception {
        User user = getUser(httpServletRequest);
        challengeService.joinChallenge(challengeId, user);
        return new ResponseEntity<>(new Response<>("suceess", "챌린지 참여 성공", "OK"), HttpStatus.OK);
    }


    // 나의 챌린지 리스트 불러오기
    @GetMapping("/list/mine")
    public ResponseEntity<Response<List<ChallengeListResponseDto>>> listMyChallenge(HttpServletRequest httpServletRequest)
            throws Exception {
        User user = getUser(httpServletRequest);
        List<ChallengeListResponseDto> challengeList = challengeService.getMyChallengeAll(user).stream()
                .map(challenge -> new ChallengeListResponseDto(challenge)).collect(Collectors.toList());

        return new ResponseEntity<>(new Response<>("success",
                "나의 챌린지 불러오기", challengeList), HttpStatus.OK);
    }


    //이때까지 열린 모든 챌린지 불러오기
    @GetMapping("/list/all")
    public ResponseEntity<Response<List<ChallengeListResponseDto>>> listAllChallenge() throws Exception {
        List<ChallengeListResponseDto> challengeList = challengeService.getChallengesAll().stream()
                .map(challenge -> new ChallengeListResponseDto(challenge)).collect(Collectors.toList());

        return new ResponseEntity<>(new Response<>("success",
                "모든 챌린지 불러 오기", challengeList), HttpStatus.OK);
    }

    // 현재 참여 가능한 챌린지 불러오기
    @GetMapping("/list/available")
    public ResponseEntity<Response<List<ChallengeListResponseDto>>> listAvailableChallenge() throws Exception {
        List<ChallengeListResponseDto> challenges = challengeService.getCahllengesAvailable().stream()
                .map(challenge -> new ChallengeListResponseDto(challenge)).collect(Collectors.toList());

        return new ResponseEntity<>(new Response<>("success",
                "현재 참여 가능한 챌린지 불러오기", challenges), HttpStatus.OK);
    }

    // 끝난 챌린지 불러오기
    @GetMapping("/list/finished")
    public ResponseEntity<Response<List<ChallengeListResponseDto>>> listFinishedChallenge() throws Exception {
        List<ChallengeListResponseDto> challenges = challengeService.getChallengesFinished().stream()
                .map(challenge -> new ChallengeListResponseDto(challenge)).collect(Collectors.toList());

        return new ResponseEntity<>(new Response<>("success",
                "끝난 챌린지 불러오기", challenges), HttpStatus.OK);
    }


    // 현재 진행중인 챌린지 불러오기
    @GetMapping("/list/ongoing")
    public ResponseEntity<Response<List<ChallengeListResponseDto>>> listOngoingChallenge() throws Exception {
        List<ChallengeListResponseDto> challenges = challengeService.getChallengesOngoing().stream()
                .map(challenge -> new ChallengeListResponseDto(challenge)).collect(Collectors.toList());

        return new ResponseEntity<>(new Response<>("success",
                "진행중인 챌린지 불러오기", challenges), HttpStatus.OK);
    }


    private User getUser(HttpServletRequest httpServletRequest) {
        String bearer = httpServletRequest.getHeader("Authorization").substring(7);
        String userId = (String) jwtProvider.get(bearer).get("userId");

        User user = userRepository.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("유저 ID를 찾을수 없습니다.");
        });
        return user;
    }


}
