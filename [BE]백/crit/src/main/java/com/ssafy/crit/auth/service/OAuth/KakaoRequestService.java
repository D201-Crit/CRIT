package com.ssafy.crit.auth.service.OAuth;

import com.ssafy.crit.auth.dto.OAuth.KakaoUserInfo;
import com.ssafy.crit.auth.dto.OAuth.OAuthSignInResponse;
import com.ssafy.crit.auth.dto.OAuth.TokenRequest;
import com.ssafy.crit.auth.dto.OAuth.TokenResponse;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.dto.*;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.auth.entity.enumType.AuthProvider;
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
public class KakaoRequestService implements RequestService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final WebClient webClient;

    @Value("${spring.security.oauth2.client.registration.kakao.authorization-grant-type}")
    private String GRANT_TYPE;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String REDIRECT_URI;

    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String TOKEN_URI;

    @Override
    public OAuthSignInResponse redirect(TokenRequest tokenRequest) {
        TokenResponse tokenResponse = getToken(tokenRequest);
        KakaoUserInfo kakaoUserInfo = getUserInfo(tokenResponse.getAccessToken());

        Long id = kakaoUserInfo.getId();
        String nickname = kakaoUserInfo.getKakaoAccount().getProfile().getNickname();
        String email = kakaoUserInfo.getKakaoAccount().getEmail();

        TokenDto accessTokenDto = jwtProvider.createAccessToken(
                String.valueOf(kakaoUserInfo.getId()), AuthProvider.KAKAO);
        // 진짜 Refresh Token을 만드는 과정
        TokenDto refreshTokenDto = jwtProvider.createRefreshToken(
                String.valueOf(kakaoUserInfo.getId()), AuthProvider.KAKAO);

        OAuthSignInResponse oAuthSignInResponse = OAuthSignInResponse.builder()
                .authProvider(AuthProvider.KAKAO)
                .id(String.valueOf(id))
                .nickname(nickname)
                .email(email)
                .accessToken(accessTokenDto.getToken())
                .refreshToken(refreshTokenDto.getToken())
                .refreshTokenExpirationTime(refreshTokenDto.getTokenExpirationTime())
                .build();

        // 기존 유저 정보가 존재하면 DB에 저장
        User userEntity;
        if (!userRepository.existsById(String.valueOf(kakaoUserInfo.getId()))) {
            userEntity = oAuthSignInResponse.toEntity();
        } else {
            userEntity = userRepository.findById(String.valueOf(id))
                    .orElseThrow(() -> new IllegalStateException("유저 아이디가 없습니다."));
            userEntity.updateRefreshToken(refreshTokenDto.getToken(), refreshTokenDto.getTokenExpirationTime());
        }
        userRepository.save(userEntity);
        return oAuthSignInResponse;
    }

    @Override
    public TokenResponse getToken(TokenRequest tokenRequest) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", GRANT_TYPE);
        formData.add("redirect_uri", REDIRECT_URI);
        formData.add("client_id", CLIENT_ID);
        formData.add("code", tokenRequest.getCode());
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
    public KakaoUserInfo getUserInfo(String accessToken) {
        return webClient.mutate()
                .baseUrl("https://kapi.kakao.com")
                .build()
                .get()
                .uri("/v2/user/me")
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(KakaoUserInfo.class)
                .block();
    }

    @Override
    public TokenResponse getRefreshToken(String provider, String refreshToken) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "refresh_token");
        formData.add("client_id", CLIENT_ID);
        formData.add("refresh_token", refreshToken);

        return webClient.mutate()
                .baseUrl("https://kauth.kakao.com")
                .build()
                .post()
                .uri("/oauth/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
//                .onStatus(HttpStatus::is4xxClientError, response -> Mono.just(new BadRequestException()))
                .bodyToMono(TokenResponse.class)
                .block();
    }
}
