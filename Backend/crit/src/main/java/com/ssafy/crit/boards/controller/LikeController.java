package com.ssafy.crit.boards.controller;

import java.util.NoSuchElementException;

import com.ssafy.crit.boards.entity.Board;
import com.ssafy.crit.boards.repository.BoardRepository;
import com.ssafy.crit.boards.service.LikeDto;
import com.ssafy.crit.boards.service.LikeService;
import com.ssafy.crit.imsimember.entity.Member;
import com.ssafy.crit.imsimember.repository.MemberRepository;
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
	private final MemberRepository memberRepository;
	private final BoardRepository boardRepository;


	@PostMapping("/{memberId}/{boardId}")
	public ResponseEntity<String> like(@PathVariable Long memberId, @PathVariable Long boardId) {
		Member member = memberRepository.findById(memberId).orElseThrow();
		Board board = boardRepository.findById(boardId).orElseThrow();
		likeService.like(member, board);
		return new ResponseEntity<>("Board liked", HttpStatus.OK);
	}

	@DeleteMapping("/{memberId}/{boardId}")
	public ResponseEntity<String> unlike(@PathVariable Long memberId, @PathVariable Long boardId) {
		Member member = memberRepository.findById(memberId).orElseThrow();
		Board board = boardRepository.findById(boardId).orElseThrow();
		likeService.unlike(member, board);
		return new ResponseEntity<>("Board unliked", HttpStatus.OK);
	}
}
