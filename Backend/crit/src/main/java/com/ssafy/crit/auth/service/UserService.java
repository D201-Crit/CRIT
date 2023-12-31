package com.ssafy.crit.auth.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.crit.auth.entity.Follow;
import com.ssafy.crit.auth.entity.enumType.Grade;
import com.ssafy.crit.auth.repository.FollowRepository;
import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;
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
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;

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
	private final ResourceLoader resourceLoader;

	private final AmazonS3Client amazonS3Client;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	public String signUp(SignUpRequestDto signUpRequestDto) throws Exception {
		if (userRepository.findById(signUpRequestDto.getId()).isPresent()) {
			throw new BadRequestException(ErrorCode.ALREADY_REGISTERED_USER_ID);
		}

		if (signUpRequestDto.getNickname().toLowerCase().contains("admin") ||
			signUpRequestDto.getId().toLowerCase().contains("admin")) {
			throw new BadRequestException(ErrorCode.INVALID_ADMIN);
		}

		// String upload = s3Uploader.uploadFiles(loadResource(), "Profile");

		User user = User.builder()
			.id(signUpRequestDto.getId())
			.email(signUpRequestDto.getEmail())
			.password(signUpRequestDto.getPassword())
			.nickname(signUpRequestDto.getNickname())
			.role(Role.USER)
			.grade(Grade.Beginner)
			.profileImageUrl("https://critservice.s3.ap-northeast-2.amazonaws.com/Profile/369bbf78-2bf6-4072-be96-e5f9f2a12d87.user-basic-profile.png")
			.exp(0)
			.authProvider(AuthProvider.EMPTY)
			.cashPoint(0)
			.build();

		user.passwordEncode(bCryptPasswordEncoder);
		return userRepository.save(user).getId();
	}

	public LogInResponseDto logIn(LogInRequestDto logInRequestDto) throws Exception {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		if (!userRepository.existsById(logInRequestDto.getId())) {
			throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
		}
		User user = userRepository.findById(logInRequestDto.getId()).get();
		if (!bCryptPasswordEncoder.matches(logInRequestDto.getPassword(), user.getPassword())) {
			throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_PASSWORD);
		}

		if (!user.getIsChecked()) {
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
			.cashPoint(user.getCashPoint())
			.imageUrl(user.getProfileImageUrl())
			.build();
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	@Scheduled(cron = "0 0 0 * * ?")
	public void resetIsChecked() {
		List<User> allUsers = userRepository.findAll();
		for (User user : allUsers) {
			System.out.println(user.getId());
			user.setIsChecked(false);
		}
		userRepository.saveAllAndFlush(allUsers);
	}

	@Transactional
	public UpdateProfilePictureDto updateProfilePicture(MultipartFile multipartFile, String userId) throws IOException {

		User user = userRepository.findById(userId).orElseThrow(
			() -> new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID)
		);

		String upload = s3Uploader.uploadFiles(multipartFile, "Profile");

		user.setProfileImageUrl(upload);

		// userRepository.save(user);
		/*파일 저장*/

		return new UpdateProfilePictureDto(upload);
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
		String userId = (String)jwtProvider.get(refreshToken).get("userId");
		String provider = (String)jwtProvider.get(refreshToken).get("provider");
		System.out.println("in getAccessToken " + userId + "  " + provider);

		if (!userRepository.existsByIdAndAuthProvider(userId, AuthProvider.findByCode(provider.toLowerCase()))) {
			throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
		} else if (jwtProvider.isExpiration(refreshToken)) {
			throw new BadRequestException(ErrorCode.TOKEN_EXPIRED);
		}

		return jwtProvider.createAccessToken(userId, AuthProvider.findByCode(provider));
	}


	public UserResponseDto follow(FollowRequestDto followRequestDto, User me) {
		log.info("user ={}", followRequestDto.getFollowingId());
		User you = userRepository.findByNickname(followRequestDto.getFollowingId())
				.orElseThrow(() -> {
					return new IllegalArgumentException(String.valueOf(ErrorCode.NOT_EXISTS_DATA));
				});

		Optional<Follow> existingFollow = followRepository.findByFollowerAndFollowing(me, you);
		if (existingFollow.isPresent()) {
			log.info("Follow relationship already exists for ={}", followRequestDto.getFollowingId());
			throw new BadRequestException(ErrorCode.ALREADY_REGISTERED_DATA);
		}
		log.info("log.info now? ={}", followRequestDto.getFollowingId());

		Follow follow = Follow.builder()
				.follower(me)
				.following(you)
				.build();

		followRepository.saveAndFlush(follow);

		List<Follow> follows = followRepository.findAll();

		return UserResponseDto.toUserResponseDto(me, follows);
	}

	public String deleteByFollowingIdAndFollowerId(FollowRequestDto followRequestDto, User user) { // 언팔로우
		log.info("you and me = {}", followRequestDto.getFollowingId() + " " + user.getNickname());

		Optional<User> youOptional = userRepository.findByNickname(followRequestDto.getFollowingId());

		if(!youOptional.isPresent()) {
			throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
		}

		User you = youOptional.get();

		boolean isFollowRelationExists = followRepository.existsByFollowerAndFollowing(user, you);
		if(!isFollowRelationExists) {
			throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
		}

		followRepository.deleteFollow(you, user);
		return "success";
	}


	public Boolean validUserId(String userId) {
		Optional<User> user = userRepository.findById(userId);
		return getValid(user, userId);
	}

	public Boolean validNickname(String nickname) {
		Optional<User> user = userRepository.findByNickname(nickname);
		return getValid(user, nickname);
	}

	private static Boolean getValid(Optional<User> user, String userinfo) {
		if (userinfo.toLowerCase().contains("admin"))
			return false;
		return !user.isPresent();
	}

	public UserResponseDto getUserProfile(User user) {
		List<Follow> all = followRepository.findAll();
		return UserResponseDto.toUserResponseDto(user, all);
	}

	public UserResponseDto getUserDetailProfile(String user){
		User user1 = userRepository.findByNickname(user).orElseThrow(() -> {
			return new IllegalArgumentException(String.valueOf(ErrorCode.NOT_EXISTS_USER_ID));
		});
		List<Follow> all = followRepository.findAll();

		return UserResponseDto.toUserResponseDto(user1, all);
	}

	// public List<UserResponseDto> getWholeUserInMyFollowing(String user){
	// 	User user1 = userRepository.findByNickname(user).orElseThrow();
	// 	List<Follow> byMyFollowings = followRepository.findByMyFollowings(user1);
	//
	// 	List<UserResponseDto> urd = new ArrayList<>();
	//
	// 	for (Follow byMyFollowing : byMyFollowings) {
	// 		Optional<User> byNickname = userRepository.findByNickname(byMyFollowing.getFollower().getNickname());
	// 		urd.add(UserResponseDto.toUserResponseDto(byNickname.get()));
	// 	}
	// 	return urd;
	// }

	public List<UserResponseDto> getWholeUserInMyFollowing(User user){
		List<Follow> myFollowings = followRepository.findByMyFollowings(user);

		return myFollowings.stream()
			.map(following -> UserResponseDto.toUserResponseDto(following.getFollowing(), followRepository.findByMyFollowings(following.getFollower())))
			.collect(Collectors.toList());
	}

	public List<UserResponseDto> getWholeUserInMyFollower(User user){
		List<Follow> myFollowers = followRepository.findByMyFollowers(user);

		return myFollowers.stream()
			.map(follower -> UserResponseDto.toUserResponseDto(follower.getFollower(), followRepository.findByMyFollowers(follower.getFollowing())))
			.collect(Collectors.toList());
	}

	public MultipartFile loadResource() throws IOException {
		Resource resource = resourceLoader.getResource("classpath:basic-profile-picture/user-basic-profile.png");

		File file = resource.getFile();

		return convertFileToMultipartFile(file);

	}

	private MultipartFile convertFileToMultipartFile(File file) throws IOException {

		FileItem fileItem = new DiskFileItem(
			"file",
			Files.probeContentType(file.toPath()),
			false,
			file.getName(),
			(int)file.length(),
			file.getParentFile());

		InputStream inputStream = new FileInputStream(file);
		OutputStream outputStream = fileItem.getOutputStream();
		IOUtils.copy(inputStream, outputStream);

		MultipartFile multipartFile = new CommonsMultipartFile(fileItem);

		return multipartFile;
	}
}
