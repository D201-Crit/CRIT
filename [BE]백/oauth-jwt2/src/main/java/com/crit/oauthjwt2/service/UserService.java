package com.crit.oauthjwt2.service;

import com.crit.oauthjwt2.common.exception.BadRequestException;
import com.crit.oauthjwt2.common.security.SecurityUtil;
import com.crit.oauthjwt2.dto.*;
import com.crit.oauthjwt2.entity.User;
import com.crit.oauthjwt2.entity.UserRepository;
import com.crit.oauthjwt2.enumType.AuthProvider;
import com.crit.oauthjwt2.enumType.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final SecurityUtil securityUtil;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public String signUp(SignUpRequestDto signUpRequestDto) throws Exception {
        if (userRepository.findById(signUpRequestDto.getId()).isPresent()) {
            throw new BadRequestException("이미 존재하는 아이디입니다.");
        }
        User user = User.builder()
                .id(signUpRequestDto.getId())
                .email(signUpRequestDto.getEmail())
                .password(signUpRequestDto.getPassword())
                .nickname(signUpRequestDto.getNickname())
                .role(Role.USER)
                .authProvider(AuthProvider.EMPTY)
                .build();

        user.passwordEncode(bCryptPasswordEncoder);
        return userRepository.save(user).getId();
    }

    public LogInResponseDto logIn(LogInRequestDto logInRequestDto) throws Exception{
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (!userRepository.existsById(logInRequestDto.getId())) {
            throw new BadRequestException("존재하지 않는 아이디입니다.");
        }
        User user = userRepository.findById(logInRequestDto.getId()).get();
        if (!bCryptPasswordEncoder.matches(logInRequestDto.getPassword(), user.getPassword())) {
            throw new BadRequestException("존재하지 않는 비밀번호입니다.");
        }
        // 토큰 발급
        TokenDto accessTokenDto = securityUtil.createAccessToken(logInRequestDto.getId(), user.getAuthProvider());
        TokenDto refreshTokenDto = securityUtil.createRefreshToken(logInRequestDto.getId(), user.getAuthProvider());

        user.updateRefreshToken(refreshTokenDto.getToken(), refreshTokenDto.getTokenExpirationTime());

        return LogInResponseDto.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .accessToken(accessTokenDto.getToken())
                .refreshToken(refreshTokenDto.getToken())
                .refreshTokenExpirationTime(refreshTokenDto.getTokenExpirationTime())
                .build();
    }

    /*
    ** 로그아웃 -> DB에 저장된 리프레쉬 토큰 최신화
     */
    public void logOut(LogOutRequestDto logOutRequestDto) {
        User user = userRepository.findByRefreshToken(logOutRequestDto.getRefreshToken()).get();
        user.expireRefreshToken(new Date());
    }
    @Transactional(readOnly = true)
    public TokenDto getAccessToken(String refreshToken) {
        String userId = (String) securityUtil.get(refreshToken).get("userId");
        String provider = (String) securityUtil.get(refreshToken).get("provider");
        System.out.println("in getAccessToken " + userId + "  " + provider);

        if(!userRepository.existsByIdAndAuthProvider(userId, AuthProvider.findByCode(provider.toLowerCase()))){
            throw new BadRequestException("CANNOT_FOUND_USER");
        } else if (securityUtil.isExpiration(refreshToken)) {
            throw new BadRequestException("TOKEN_EXPIRED");
        }

        return securityUtil.createAccessToken(userId, AuthProvider.findByCode(provider));
    }
}
