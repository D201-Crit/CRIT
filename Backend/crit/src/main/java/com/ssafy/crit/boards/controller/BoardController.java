package com.ssafy.crit.boards.controller;

import java.io.IOException;
import java.util.List;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.service.dto.BoardResponseDto;
import com.ssafy.crit.boards.service.dto.BoardSaveRequestDto;
import com.ssafy.crit.boards.service.dto.BoardShowSortDto;
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

	@GetMapping("/whole/{category_id}")
	public Response<?> getBoards(Pageable pageable,
								 @PathVariable("category_id") String category,
								 @RequestParam(required = false) String sortted,
								 @RequestParam(required = false) String part) {

		Page<BoardShowSortDto> boards;

		if (part != null) {
			boards = boardService.findByTitleContaining(part,category, pageable);
			return new Response<>("성공", "포함된 단어 찾기", boards);
		}

		if ("views-desc".equals(sortted)) {
			boards = boardService.orderByViewsDesc(pageable,category);
			return new Response<>("성공", "조회순 내림차순", boards);
		}

		if ("views-asc".equals(sortted)) {
			boards = boardService.orderByViewsAsc(pageable,category);
			return new Response<>("성공", "조회순 오름차순", boards);
		}

		if ("likes-desc".equals(sortted)) {
			boards = boardService.orderByLikesDesc(pageable,category);
			return new Response<>("성공", "조회순 내림차순", boards);
		}

		if ("likes-asc".equals(sortted)) {
			boards = boardService.orderByLikesAsc(pageable,category);
			return new Response<>("성공", "조회순 오름차순", boards);
		}


		boards = boardService.getBoards(pageable, category);
		return new Response<>("성공", "카테고리별 전체 게시물 리턴", boards);
	}




	//전체 게시물 조회
	@GetMapping("/whole")
	public Response<?> getBoards(Pageable pageable) {
		return new Response<>("성공", "전체 게시물 리턴", boardService.getWholeBoards(pageable));
	}

	//챌린지별 전체 조회
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

	@PostMapping("/deleteImageOne/{boardId}/{fileId}")
	public Response<?> imageDelete(@PathVariable("boardId") Long id, @PathVariable("fileId") Long fileId, HttpServletRequest httpServletRequest){
		User user = getUser(httpServletRequest);
		return new Response<>("성공", "이미지 삭제 링크 추가 성공", boardService.imageDelete(id, fileId));

	}

	@PostMapping("/clearListMapping")
	public Response<?> clearMapping(){
		boardService.clearList();
		return new Response<>("성공", "리스트clear", null);	}


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
			return new IllegalArgumentException("유저 ID를 찾을수 없습니다.");
		});
		return user;
	}
}
