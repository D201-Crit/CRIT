package com.ssafy.crit.boards.controller;


import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.repository.BoardRepository;
import com.ssafy.crit.boards.service.LikeService;
import com.ssafy.crit.message.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LikeController {
	private final LikeService likeService;
	private final UserRepository userRepository;
	private final BoardRepository boardRepository;
	private final JwtProvider jwtProvider;


	@PostMapping("/boards/likes/{boardId}")
	public Response<?> like(HttpServletRequest httpServletRequest, @PathVariable Long boardId) {

		User user = getUser(httpServletRequest);
		Board board = boardRepository.findById(boardId).orElseThrow();
		return new Response<>("성공", "좋아요 성공 완료", likeService.like(user, board));
	}

	@DeleteMapping("/boards/likes/{boardId}")
	public Response<?> unlike(HttpServletRequest httpServletRequest, @PathVariable Long boardId) {

		User user = getUser(httpServletRequest);
		Board board = boardRepository.findById(boardId).orElseThrow();
		return new Response<>("성공", "좋아요 삭제 완료", likeService.unlike(user, board));
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
