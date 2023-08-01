package com.ssafy.crit.auth.controller;

import com.ssafy.crit.auth.dto.*;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.auth.service.UserService;
import com.ssafy.crit.message.response.Response;
import com.ssafy.crit.shorts.dto.ShortsDto;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpRequestDto signUpRequestDto) throws Exception {
        return ResponseEntity.ok(userService.signUp(signUpRequestDto));
    }
    // 일반 유저 로그인
    @PostMapping("/login")
    public ResponseEntity<LogInResponseDto> logIn(@RequestBody LogInRequestDto logInRequestDto) throws Exception{
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

    /*
    ** AccessToken 재발급
     */
    @PostMapping("/token")
    public ResponseEntity<TokenDto> getAccessToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String token = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);
        }
        System.out.println("in controller=========" + token);
        return ResponseEntity.ok(userService.getAccessToken(token));
    }

    @PutMapping(value = "/image",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<UpdateProfilePictureDto> create(@RequestPart(value="file", required = false) MultipartFile file, HttpServletRequest httpServletRequest) throws Exception {
        User user = getUser(httpServletRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.updateProfilePictureDto(file, user.getId()));
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

    @PostMapping("/follow")
    public Response<?> follow(@RequestBody FollowRequestDto followRequestDto, HttpServletRequest httpServletRequest) {
        User user = getUser(httpServletRequest);

        return new Response<>("true","follow 성공",userService.follow(followRequestDto));
    }


}
