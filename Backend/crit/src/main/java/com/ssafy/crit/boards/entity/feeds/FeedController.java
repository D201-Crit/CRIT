package com.ssafy.crit.boards.entity.feeds;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.message.response.Response;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/feeds")
public class FeedController {

	private final FeedService feedService;
	private final JwtProvider jwtProvider;
	private final UserRepository userRepository;


	@PostMapping(value = "/create",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public Response<?> create(@RequestPart(value="fileResponseDto") FileResponseDto fileResponseDto,
		@RequestPart(value="file") List<MultipartFile> multipartFiles,
		HttpServletRequest httpServletRequest) throws Exception {

		User user = getUser(httpServletRequest);

		if(fileResponseDto.getUserName().equals(user.getId())) {
			return new Response<>("성공","피드 생성 성공",feedService.storeFiles(fileResponseDto, multipartFiles,user));

		}
		return new Response<>("성공","피드 생성 실패","다시해보게나");
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
