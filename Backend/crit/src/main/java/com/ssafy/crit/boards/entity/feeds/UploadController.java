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

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/feeds")
public class UploadController {

	private final FeedsRepository feedsRepository;
	private final FileService fileService;
	private final JwtProvider jwtProvider;
	private final UserRepository userRepository;


	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<FileResponseDto> create(@RequestPart(value="fileResponseDto") FileResponseDto fileResponseDto,
		@RequestPart(value="file") List<MultipartFile> multipartFiles,
		HttpServletRequest httpServletRequest) throws Exception {

		User user = getUser(httpServletRequest);
		// fileResponseDto.setUserName(user.getId()); // Set the user id
		log.info("user = {} ", user);
		log.info("fileResponseDto.getUserName() = {} ", fileResponseDto.getUserName());

		if(fileResponseDto.getUserName().equals(user.getId())) {

			log.info("=====================TRUE========================");
			return ResponseEntity.status(HttpStatus.CREATED)
				.body(fileService.storeFiles(fileResponseDto, multipartFiles));
		}

		log.info("=======================FALSE=========================");
		return null;
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
