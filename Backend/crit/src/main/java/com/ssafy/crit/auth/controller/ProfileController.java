package com.ssafy.crit.auth.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.crit.auth.dto.FollowRequestDto;
import com.ssafy.crit.auth.dto.LogOutRequestDto;
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
	public Response<?> follow(@RequestBody FollowRequestDto followRequestDto, HttpServletRequest httpServletRequest) {
		User user = getUser(httpServletRequest);
		return new Response<>("true","follow 성공",userService.follow(followRequestDto));
	}

	@GetMapping("/myProfile")
	public Response<?> getUserProfile(HttpServletRequest httpServletRequest){
		User user = getUser(httpServletRequest);
		return new Response<>("성공", "프로필 불러오기 성공", userService.getUserProfile(user));
	}

	private User getUser(HttpServletRequest httpServletRequest) {
		String header = httpServletRequest.getHeader("Authorization");
		String bearer = header.substring(7);
		String userId = (String) jwtProvider.get(bearer).get("userId");

		User user = userRepository.findById(userId).orElseThrow(() -> {
			return new IllegalArgumentException("유저 ID를 찾을수 없습니다.");
		});
		return user;
	}
}
