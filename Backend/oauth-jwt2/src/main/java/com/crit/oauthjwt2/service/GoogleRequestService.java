package com.crit.oauthjwt2.service;

import com.crit.oauthjwt2.common.security.SecurityUtil;
import com.crit.oauthjwt2.dto.*;
import com.crit.oauthjwt2.entity.User;
import com.crit.oauthjwt2.entity.UserRepository;
import com.crit.oauthjwt2.enumType.AuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class GoogleRequestService implements RequestService {
    private final UserRepository userRepository;
    private final SecurityUtil securityUtil;
    private final WebClient webClient;

    @Value("${spring.security.oauth2.client.registration.google.authorization-grant-type}")
    private String GRANT_TYPE;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String CLIENT_SECRET;

    @Value("${spring.security.oauth2.client.provider.google.token_uri}")
    private String TOKEN_URI;

    @Value("${spring.security.oauth2.client.provider.google.user-info-uri}")
    private String USER_INFO_URI;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String REDIRECT_URI;

    @Override
    public OAuthSignInResponse redirect(TokenRequest tokenRequest) {
        TokenResponse tokenResponse = getToken(tokenRequest);
        GoogleUserInfo googleUserInfo = getUserInfo(tokenResponse.getAccessToken());

        TokenDto accessTokenDto = securityUtil.createAccessToken(
                googleUserInfo.getId(), AuthProvider.GOOGLE);
        TokenDto refreshTokenDto = securityUtil.createRefreshToken(
                googleUserInfo.getId(), AuthProvider.GOOGLE);

        OAuthSignInResponse oAuthSignInResponse = OAuthSignInResponse.builder()
                .authProvider(AuthProvider.GOOGLE)
                .id(googleUserInfo.getId())
                .nickname(googleUserInfo.getName())
                .email(googleUserInfo.getEmail())
                .accessToken(accessTokenDto.getToken())
                .refreshToken(refreshTokenDto.getToken())
                .refreshTokenExpirationTime(refreshTokenDto.getTokenExpirationTime())
                .build();

        User userEntity;
        if(!userRepository.existsById(googleUserInfo.getId())){
            userEntity = oAuthSignInResponse.toEntity();
        } else {
            userEntity = userRepository.findById(String.valueOf(googleUserInfo.getId()))
                    .orElseThrow(() -> new IllegalStateException("유저 아이디가 없습니다."));
            userEntity.updateRefreshToken(refreshTokenDto.getToken(), refreshTokenDto.getTokenExpirationTime());
        }
        userRepository.save(userEntity);
        return oAuthSignInResponse;

    }

    @Override
    public TokenResponse getToken(TokenRequest tokenRequest) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("code", tokenRequest.getCode());
        formData.add("client_id", CLIENT_ID);
        formData.add("client_secret", CLIENT_SECRET);
        formData.add("redirect_uri", REDIRECT_URI);
        formData.add("grant_type", GRANT_TYPE);

        return webClient.mutate()
                .baseUrl(TOKEN_URI)
                .build()
                .post()
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
//                .onStatus(HttpStatus::is4xxClientError, response -> Mono.just(new BadRequestException()))
                .bodyToMono(TokenResponse.class)
                .block();
    }

    @Override
    public GoogleUserInfo getUserInfo(String accessToken) {
        return webClient.mutate()
                .baseUrl(USER_INFO_URI)
                .build()
                .get()
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GoogleUserInfo.class)
                .block();
    }

    @Override
    public TokenResponse getRefreshToken(String provider, String refreshToken) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "refresh_token");
        formData.add("client_id", CLIENT_ID);
        formData.add("client_secret", CLIENT_SECRET);
        formData.add("refresh_token", refreshToken);

        return webClient.mutate()
                .baseUrl(TOKEN_URI)
                .build()
                .post()
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
//                .onStatus(HttpStatus::is4xxClientError, response -> Mono.just(new BadRequestException()))
                .bodyToMono(TokenResponse.class)
                .block();
    }
}
