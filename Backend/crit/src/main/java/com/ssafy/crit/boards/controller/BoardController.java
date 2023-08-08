package com.ssafy.crit.boards.controller;

import java.io.IOException;
import java.util.List;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.service.dto.BoardResponseDto;
import com.ssafy.crit.boards.service.dto.BoardSaveRequestDto;
import com.ssafy.crit.boards.service.dto.BoardShowSortDto;
import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;
import com.ssafy.crit.message.response.Response;
import com.ssafy.crit.boards.service.BoardService;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

/**
 * author : 강민승
 */

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/boards")
public class BoardController {

	private final BoardService boardService;
	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;


	// 전체 게시글 조회
	@GetMapping("/whole/{category_id}")
	public Response<Page<BoardShowSortDto>> getBoards(Pageable pageable, @PathVariable("category_id") String category) {
		return new Response <> ("성공", "전체 게시물 리턴", boardService.getBoards(pageable, category));
	}


	@GetMapping("/whole")
	public Response<?> getBoards(Pageable pageable) {
		return new Response<>("성공", "전체 게시물 리턴", boardService.getWholeBoards(pageable));
	}

	@GetMapping("/challengeWhole/{category_id}")
	public Response<?> getChallengeBoards(@PathVariable("category_id") String category) {
		return new Response<>("성공", "전체 챌린지 게시물 리턴",
			boardService.getWholeChallengeBoards(category));
	}

	// 개별 게시글 조회
	@GetMapping("/{id}")
	public Response<?> getBoard(@PathVariable("id") Long id) {
		return new Response<>("성공", "개별 게시물 리턴", boardService.getBoard(id));
	}

	// 게시글 작성
	@PostMapping(value = "/write", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public Response<?> write(@RequestPart BoardSaveRequestDto boardSaveRequestDto, HttpServletRequest httpServletRequest,
							 @RequestPart(value = "file", required = false) List<MultipartFile> multipartFiles) throws IOException {

		User user = getUser(httpServletRequest);

		return new Response<>("성공", "글 작성 성공", boardService.write(multipartFiles, boardSaveRequestDto, user));
	}

	// 게시글 수정
	@PatchMapping(value = "/update/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public Response<?> edit(@RequestPart(value = "boardDto") BoardResponseDto boardDto, @PathVariable("id") Long id,
							HttpServletRequest httpServletRequest,
							@RequestPart(value = "file", required = false) List<MultipartFile> multipartFiles) throws IOException {

		User user = getUser(httpServletRequest);
		return new Response<>("성공", "글 수정 성공", boardService.update(id, boardDto, multipartFiles, user));

	}

	// 게시글 삭제
	@DeleteMapping("/delete/{id}")
	public Response<?> delete(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
		User user = getUser(httpServletRequest);
		boardService.delete(id, user);
		return new Response<>("성공", "글 삭제 성공", null);

	}

	@GetMapping("/desc")
	public Response<?> getBoardsInDescOrder(Pageable pageable) {
		Page<BoardShowSortDto> allDesc = boardService.findAllDesc(pageable);
		return new Response<>("성공", "타이틀 내림차순", allDesc);
	}

	@GetMapping("/asc")
	public Response<?> getBoardsInAscOrder(Pageable pageable) {
		Page<BoardShowSortDto> boards = boardService.findAllAsc(pageable);
		return new Response<>("성공", "타이틀 오름차순", boards);
	}

	@GetMapping("/viewsdesc")
	public Response<?> getBoardsViewsDesc(Pageable pageable) {
		Page<BoardShowSortDto> boards = boardService.orderByViewsDesc(pageable);
		return new Response<>("성공", "조회순 내림차순", boards);
	}

	@GetMapping("/viewsasc")
	public Response<?> getBoardsViewsAsc(Pageable pageable) {
		Page<BoardShowSortDto> boards = boardService.orderByViewsAsc(pageable);
		return new Response<>("성공", "조회순 내림차순", boards);
	}

	@GetMapping("/containing")
	public Response<?> getFindByContaining(String part, Pageable pageable) {
		Page<BoardShowSortDto> boards = boardService.findByTitleContaining(part, pageable);
		return new Response<>("성공", "포함된 단어 찾기", boards);
	}

	@GetMapping("/classificationOfMyBoards")
	public Response<?> getMyBoardsClassification(@RequestParam("classification") String classificationString, HttpServletRequest httpServletRequest, Pageable pageable){
		User user = getUser(httpServletRequest);
		return new Response<>("성공", "분류 별 내가 쓴 게시판 찾기",
				boardService.findAllByUserAndClassification(user, classificationString, pageable));
	}

	@GetMapping("/myBoards")
	public Response<?> getMyBoards(HttpServletRequest httpServletRequest, Pageable pageable){
		User user = getUser(httpServletRequest);
		return new Response<>("성공", "분류 별 내가 쓴 게시판 찾기",
				boardService.findAllByUser(user, pageable));
	}



	private User getUser(HttpServletRequest httpServletRequest) {
		String header = httpServletRequest.getHeader("Authorization");
		String bearer = header.substring(7);
		String userId = (String)jwtProvider.get(bearer).get("userId");

		User user = userRepository.findById(userId).orElseThrow(() -> {
			return new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
		});
		return user;
	}
}
