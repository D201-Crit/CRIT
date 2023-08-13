package com.ssafy.crit.auth.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.crit.auth.dto.UserResponseDto;
import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.crit.auth.dto.FollowRequestDto;
import com.ssafy.crit.auth.dto.UpdateProfilePictureDto;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.auth.service.UserService;
import com.ssafy.crit.message.response.Response;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProfileController {

	private final UserService userService;
	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;

	@PutMapping(value = "/image",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<UpdateProfilePictureDto> create(@RequestPart(value="file", required = false) MultipartFile file, HttpServletRequest httpServletRequest) throws Exception {
		User user = getUser(httpServletRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.updateProfilePicture(file, user.getId()));
	}

	@PostMapping("/follow")
	public UserResponseDto follow(@RequestBody FollowRequestDto followRequestDto, HttpServletRequest request) throws Exception {

		User user = getUser(request);

		return userService.follow(followRequestDto, user);
	}

	@PostMapping("/unfollow")
	public String unfollow(@RequestBody FollowRequestDto followRequestDto, HttpServletRequest request) throws Exception {
		User user = getUser(request);

		return userService.deleteByFollowingIdAndFollowerId(followRequestDto, user);
	}

	@GetMapping("/myProfile")
	public Response<?> getUserProfile(HttpServletRequest httpServletRequest){
		User user = getUser(httpServletRequest);
		return new Response<>("성공", "프로필 불러오기 성공", userService.getUserProfile(user));
	}

	@GetMapping("/user/profile/{nick_name}")
	public Response<?> getUserDetailProfile(@PathVariable("nick_name") String name){
		return new Response<>("성공", "남의 프로필 조회 성공", userService.getUserDetailProfile(name));
	}

	// @GetMapping("/whole/user")
	// public Response<?> getWholeUserInMyFollowing(HttpServletRequest httpServletRequest){
	// 	User user = getUser(httpServletRequest);
	//
	// 	return new Response<>("성공", "팔로잉한 모든 유저 조회 성공", userService.getWholeUserInMyFollowing(user.getNickname()));
	// }
	@GetMapping("/whole/user")
	public Response<?> getWholeUserInMyFollowing(HttpServletRequest httpServletRequest){
		User user = getUser(httpServletRequest);
		List<UserResponseDto> users = userService.getWholeUserInMyFollowing(user);
		return new Response<>("성공", "팔로잉한 모든 유저 조회 성공", users);
	}



	private User getUser(HttpServletRequest httpServletRequest) {
		String header = httpServletRequest.getHeader("Authorization");
		String bearer = header.substring(7);
		String userId = (String) jwtProvider.get(bearer).get("userId");

		User user = userRepository.findById(userId).orElseThrow(() -> {
			return new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
		});
		return user;
	}
}
