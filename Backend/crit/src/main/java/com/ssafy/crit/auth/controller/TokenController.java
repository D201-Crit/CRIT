package com.ssafy.crit.auth.controller;

import com.ssafy.crit.auth.dto.TokenDto;
import com.ssafy.crit.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/token")
public class TokenController {
    private final UserService userService;

    // AccessToken 재발급
    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> getAccessToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String token = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);
        }
        return ResponseEntity.ok(userService.getAccessToken(token));
    }
}
