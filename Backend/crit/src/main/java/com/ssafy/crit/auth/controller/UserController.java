package com.ssafy.crit.auth.controller;

import com.ssafy.crit.auth.dto.*;
import com.ssafy.crit.auth.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {
    private final UserService userService;

    // 회원가입
//    @PostMapping("/signup")
//    public ResponseEntity<String> signUp(@RequestPart("signUpRequestDto") SignUpRequestDto signUpRequestDto) throws Exception {
//        return ResponseEntity.ok(userService.signUp(signUpRequestDto));
//    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpRequestDto signUpRequestDto) throws Exception {
        return ResponseEntity.ok(userService.signUp(signUpRequestDto));
    }

    // 일반 유저 로그인
    @PostMapping("/login")
    public ResponseEntity<LogInResponseDto> logIn(@RequestBody LogInRequestDto logInRequestDto) throws Exception {
        return ResponseEntity.ok(userService.logIn(logInRequestDto));
    }

    /*
     ** 로그아웃
     ** 프론트에서 access, refresh token을 전달받고 로그아웃 처리
     ** 프론트에서도 store에 저장된 token 정보를 삭제
     */
    @PostMapping("/logout")
    public String logOut(@RequestBody LogOutRequestDto logOutRequestDto) {
        userService.logOut(logOutRequestDto);
        return "success logout";
    }
    // 유저 아이디 중복체크
    @PostMapping("/valid/userId")
    public ResponseEntity<Boolean> validUserId(@RequestParam String userId) {
        return ResponseEntity.ok(userService.validUserId(userId));
    }
    // 유저 닉네임 중복체크
    @PostMapping("/valid/nickname")
    public ResponseEntity<Boolean> validNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.validNickname(nickname));
    }
}
