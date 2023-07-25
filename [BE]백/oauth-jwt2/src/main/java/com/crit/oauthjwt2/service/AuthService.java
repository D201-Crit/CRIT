package com.crit.oauthjwt2.service;

import com.crit.oauthjwt2.common.exception.BadRequestException;
import com.crit.oauthjwt2.common.security.SecurityUtil;
import com.crit.oauthjwt2.dto.OAuthSignInResponse;
import com.crit.oauthjwt2.dto.TokenDto;
import com.crit.oauthjwt2.dto.TokenRequest;
import com.crit.oauthjwt2.dto.TokenResponse;
import com.crit.oauthjwt2.entity.UserRepository;
import com.crit.oauthjwt2.enumType.AuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final KakaoRequestService kakaoRequestService;
    private final NaverRequestService naverRequestService;
    private final GoogleRequestService googleRequestService;
    private final UserRepository userRepository;
    private final SecurityUtil securityUtil;

    @Transactional
    public OAuthSignInResponse redirect(TokenRequest tokenRequest){
        if(AuthProvider.KAKAO.getAuthProvider().equals(tokenRequest.getRegistrationId())){
            return kakaoRequestService.redirect(tokenRequest);
        } else if(AuthProvider.NAVER.getAuthProvider().equals(tokenRequest.getRegistrationId())){
            return naverRequestService.redirect(tokenRequest);
        } else if(AuthProvider.GOOGLE.getAuthProvider().equals(tokenRequest.getRegistrationId())) {
            return googleRequestService.redirect(tokenRequest);
        }

        throw new BadRequestException("not supported oauth provider");
    }

    public OAuthSignInResponse refreshToken(TokenRequest tokenRequest){
        String userId = (String) securityUtil.get(tokenRequest.getRefreshToken()).get("userId");
        String provider = (String) securityUtil.get(tokenRequest.getRefreshToken()).get("provider");
        String oldRefreshToken = (String) securityUtil.get(tokenRequest.getRefreshToken()).get("refreshToken");

        if(!userRepository.existsByIdAndAuthProvider(userId, AuthProvider.findByCode(provider.toLowerCase()))){
            throw new BadRequestException("CANNOT_FOUND_USER");
        }

        TokenResponse tokenResponse = null;
        if(AuthProvider.KAKAO.getAuthProvider().equals(provider.toLowerCase())){
            tokenResponse = kakaoRequestService.getRefreshToken(provider, oldRefreshToken);
        } else if(AuthProvider.NAVER.getAuthProvider().equals(provider.toLowerCase())){
            tokenResponse = naverRequestService.getRefreshToken(provider, oldRefreshToken);
        } else if(AuthProvider.GOOGLE.getAuthProvider().equals(provider.toLowerCase())){
            tokenResponse = googleRequestService.getRefreshToken(provider, oldRefreshToken);
        }
        // access 토큰 생성
        TokenDto accessTokenDto = securityUtil.createAccessToken(
                userId, AuthProvider.findByCode(provider.toLowerCase()));

        return OAuthSignInResponse.builder()
                .authProvider(AuthProvider.findByCode(provider.toLowerCase()))
                .accessToken(accessTokenDto.getToken())
                .refreshToken(null)
                .build();
    }
}
