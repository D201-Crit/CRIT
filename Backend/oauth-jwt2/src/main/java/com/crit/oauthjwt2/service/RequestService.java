package com.crit.oauthjwt2.service;

import com.crit.oauthjwt2.dto.OAuthSignInResponse;
import com.crit.oauthjwt2.dto.TokenRequest;
import com.crit.oauthjwt2.dto.TokenResponse;

public interface RequestService<T> {
    OAuthSignInResponse redirect(TokenRequest tokenRequest);
    TokenResponse getToken(TokenRequest tokenRequest);
    T getUserInfo(String accessToken);
    TokenResponse getRefreshToken(String provider, String refreshToken);
}
