package com.ssafy.crit.auth.service;

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

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
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

    @Scheduled(cron = "0 0 12 * * ?")
    public void resetIsChecked() {
        List<User> allUsers = userRepository.findAll();
        for(User user : allUsers) {
            user.setIsChecked(false);
        }
        userRepository.saveAll(allUsers);
    }


    @Transactional
    public UpdateProfilePictureDto updateProfilePictureDto(MultipartFile file, String userId) throws IOException {

        User user = userRepository.findById(userId).orElseThrow();

        /*우리의 프로젝트경로를 담아주게 된다 - 저장할 경로를 지정*/
        String projectPath = "C:\\files/";

        /*식별자 . 랜덤으로 이름 만들어줌*/
        UUID uuid = UUID.randomUUID();

        /*랜덤식별자_원래파일이름 = 저장될 파일이름 지정*/
        String ImageName = uuid + "_" + file.getOriginalFilename();

        /*빈 껍데기 생성*/
        /*File을 생성할건데, 이름은 "name" 으로할거고, projectPath 라는 경로에 담긴다는 뜻*/
        File saveShorts = new File(projectPath, ImageName);

        file.transferTo(saveShorts);

        log.info("projectPath={}", projectPath);
        log.info("Image={}", ImageName);

        user.setProfileImageName(ImageName);
        user.setProfileImageUrl(projectPath);

        userRepository.save(user);
        /*파일 저장*/

        return new UpdateProfilePictureDto(user.getProfileImageUrl(), user.getProfileImageName());
        // return null;
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
