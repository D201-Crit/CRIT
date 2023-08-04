package com.ssafy.crit.auth.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.crit.auth.entity.Follow;
import com.ssafy.crit.auth.entity.enumType.Grade;
import com.ssafy.crit.auth.repository.FollowRepository;
import com.ssafy.crit.common.exception.BadRequestException;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.dto.*;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.auth.entity.enumType.AuthProvider;
import com.ssafy.crit.auth.entity.enumType.Role;
import com.ssafy.crit.common.s3.S3Uploader;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FollowRepository followRepository;
    private final S3Uploader s3Uploader;

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


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
            .grade(Grade.Beginner)
            .exp(0)
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

        if(!user.getIsChecked()){
            user.loginExp(user.getExp(), false);
            user.setGrade(user.getExp());
        }

        // 토큰 발급
        TokenDto accessTokenDto = jwtProvider.createAccessToken(logInRequestDto.getId(), user.getAuthProvider());
        TokenDto refreshTokenDto = jwtProvider.createRefreshToken(logInRequestDto.getId(), user.getAuthProvider());

        user.updateRefreshToken(refreshTokenDto.getToken(), refreshTokenDto.getTokenExpirationTime());

        return LogInResponseDto.builder()
            .id(user.getId())
            .nickname(user.getNickname())
            .email(user.getEmail())
            .accessToken(accessTokenDto.getToken())
            .refreshToken(refreshTokenDto.getToken())
            .refreshTokenExpirationTime(refreshTokenDto.getTokenExpirationTime())
            .exp(user.getExp())
            .grade(user.getGrade())
            .build();
    }

    @Transactional(propagation= Propagation.REQUIRES_NEW)
    @Scheduled(cron = "0 0 12 * * ?")
    public void resetIsChecked() {
        List<User> allUsers = userRepository.findAll();
        for(User user : allUsers) {
            user.setIsChecked(false);
        }
        userRepository.saveAll(allUsers);
    }


    @Transactional
    public UpdateProfilePictureDto updateProfilePictureDto(MultipartFile multipartFile, String userId) throws IOException {

        User user = userRepository.findById(userId).orElseThrow();

        String uploadFiles = s3Uploader.uploadFiles(multipartFile, "Profile");

        user.setProfileImageUrl(uploadFiles);

        userRepository.save(user);
        /*파일 저장*/

        return new UpdateProfilePictureDto(user.getProfileImageUrl());
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
        String userId = (String) jwtProvider.get(refreshToken).get("userId");
        String provider = (String) jwtProvider.get(refreshToken).get("provider");
        System.out.println("in getAccessToken " + userId + "  " + provider);

        if(!userRepository.existsByIdAndAuthProvider(userId, AuthProvider.findByCode(provider.toLowerCase()))){
            throw new BadRequestException("CANNOT_FOUND_USER");
        } else if (jwtProvider.isExpiration(refreshToken)) {
            throw new BadRequestException("TOKEN_EXPIRED");
        }

        return jwtProvider.createAccessToken(userId, AuthProvider.findByCode(provider));
    }

    public UserResponseDto follow(FollowRequestDto followRequestDto) {
        User user1 = userRepository.findById(followRequestDto.getFollowerId())
            .orElseThrow(() -> new IllegalArgumentException("User with nickname " + followRequestDto.getFollowerId() + " does not exist."));
        User user2 = userRepository.findById(followRequestDto.getFollowingId())
            .orElseThrow(() -> new IllegalArgumentException("User with nickname " + followRequestDto.getFollowingId() + " does not exist."));
        Optional<Follow> optionalFollow = followRepository.findByFollowerAndFollowing(user1,user2);

        if (optionalFollow.isEmpty()) {
            Follow followFunc = Follow.builder()
                .follower(user1)
                .following(user2).build();
            followRepository.save(followFunc);
            user1.addMemberTofollower(followFunc);
            user2.addMemberTofollowing(followFunc);
        } else {
            Follow follow = optionalFollow.get();
            user1.removeMemberTofollower(follow);
            user2.removeMemberTofollowing(follow);
            followRepository.deleteByFollowerAndFollowing(user1,user2);
        }

        return UserResponseDto.toUserResponseDto(user1);
    }
}
