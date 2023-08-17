package com.ssafy.crit.boards.controller;



import com.ssafy.crit.boards.repository.BoardRepository;
import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.service.FeedService;
import com.ssafy.crit.boards.service.dto.FileResponseDto;
import com.ssafy.crit.message.response.Response;

/**
 * author : 강민승
 */

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
		return new Response<>("성공","피드 생성 성공",feedService.storeFiles(fileResponseDto, multipartFiles,user));
}

	@GetMapping("/{feed_id}")
	public Response<?> getFeed(@PathVariable("feed_id") Long id){
		return new Response<>("성공", "개별 피드 가져오기", feedService.getFeed(id));
	}

	@GetMapping("/whole")
	public Response<?> getFeeds(Pageable pageable, HttpServletRequest httpServletRequest,
								@RequestParam(required = false) String Nickname){
		User user = getUser(httpServletRequest);

		if(Nickname != null){
			return new Response<>("성공", "다른 사람 피드 가져오기", feedService.getElseFeeds(pageable,Nickname));
		}

		return new Response<>("성공", "전체 피드 가져오기", feedService.getFeeds(pageable, user));
	}


	@DeleteMapping("/delete/{id}")
	public Response<?> delete(@PathVariable("id") Long id, HttpServletRequest httpServletRequest){
		User user = getUser(httpServletRequest);
		return new Response<>("성공","피드 삭제 완료", feedService.delete(id, user));
	}

	@PutMapping("/update/{id}")
	public Response<?> edit(@RequestBody FileResponseDto fileResponseDto, @PathVariable("id") Long id,
		HttpServletRequest httpServletRequest) {
		User user = getUser(httpServletRequest);
		return new Response<>("성공", "글 수정 성공", feedService.update(id, fileResponseDto, user));
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
