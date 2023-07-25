package com.crit.oauthjwt2.controller;

import com.crit.oauthjwt2.dto.OAuthSignInResponse;
import com.crit.oauthjwt2.dto.TokenRequest;
import com.crit.oauthjwt2.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login/oauth2/code/{registrationId}")
    public ResponseEntity<OAuthSignInResponse> redirect(
            @PathVariable("registrationId") String registrationId
            , @RequestParam("code") String code
            , @RequestParam("state") String state) {
        return ResponseEntity.ok(
                authService.redirect(
                    TokenRequest.builder()
                            .registrationId(registrationId)
                            .code(code)
                            .state(state)
                            .build()));
    }
    // accessToken 생성 컨트롤러
    @PostMapping("/auth/token")
    public ResponseEntity<OAuthSignInResponse> refreshToken(@RequestBody TokenRequest tokenRequest){
        return ResponseEntity.ok(authService.refreshToken(tokenRequest));
    }
}