package com.ssafy.crit.auth.service.OAuth;

import com.ssafy.crit.auth.dto.OAuth.OAuthSignInResponse;
import com.ssafy.crit.auth.dto.OAuth.TokenRequest;
import com.ssafy.crit.auth.dto.OAuth.TokenResponse;

public interface RequestService<T> {
    OAuthSignInResponse redirect(TokenRequest tokenRequest);
    TokenResponse getToken(TokenRequest tokenRequest);
    T getUserInfo(String accessToken);
    TokenResponse getRefreshToken(String provider, String refreshToken);
}
