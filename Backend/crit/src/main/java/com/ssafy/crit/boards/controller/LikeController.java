package com.ssafy.crit.boards.controller;

import java.util.NoSuchElementException;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.Board;
import com.ssafy.crit.boards.repository.BoardRepository;
import com.ssafy.crit.boards.service.LikeDto;
import com.ssafy.crit.boards.service.LikeService;
import com.ssafy.crit.imsimember.entity.Member;
import com.ssafy.crit.imsimember.repository.MemberRepository;
import com.ssafy.crit.message.response.Response;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/like")
public class LikeController {
	private final LikeService likeService;
	private final UserRepository userRepository;
	private final BoardRepository boardRepository;
	private final JwtProvider jwtProvider;


	@PostMapping("/boards/likes/{boardId}")
	public Response<?> like(HttpServletRequest httpServletRequest, @PathVariable Long boardId) {

		User user = getUser(httpServletRequest);
		Board board = boardRepository.findById(boardId).orElseThrow();
		likeService.like(user, board);
		return new Response<>("성공", "좋아요 성공 완료", user + "가 " + board+ "를 좋아합니다.");
	}

	@DeleteMapping("/boards/likes/{boardId}")
	public Response<?> unlike(HttpServletRequest httpServletRequest, @PathVariable Long boardId) {

		User user = getUser(httpServletRequest);
		Board board = boardRepository.findById(boardId).orElseThrow();
		likeService.unlike(user, board);
		return new Response<>("성공", "좋아요 삭제 완료", user + "가 " + board+ " 좋아요 취소.");
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
