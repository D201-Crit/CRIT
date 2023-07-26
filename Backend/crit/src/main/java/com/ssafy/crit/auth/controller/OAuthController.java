package com.ssafy.crit.auth.controller;

import com.ssafy.crit.auth.dto.OAuth.OAuthSignInResponse;
import com.ssafy.crit.auth.dto.OAuth.TokenRequest;
import com.ssafy.crit.auth.service.OAuth.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class OAuthController {
    private final OAuthService OAuthService;

    @PostMapping("/login/oauth2/code/{registrationId}")
    public ResponseEntity<OAuthSignInResponse> redirect(
            @PathVariable("registrationId") String registrationId
            , @RequestParam("code") String code
            , @RequestParam("state") String state) {
        return ResponseEntity.ok(
                OAuthService.redirect(
                    TokenRequest.builder()
                            .registrationId(registrationId)
                            .code(code)
                            .state(state)
                            .build()));
    }
    // accessToken 생성 컨트롤러
    @PostMapping("/auth/token")
    public ResponseEntity<OAuthSignInResponse> refreshToken(@RequestBody TokenRequest tokenRequest){
        return ResponseEntity.ok(OAuthService.refreshToken(tokenRequest));
    }
}
