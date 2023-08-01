package com.ssafy.crit.boards.service;


import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.board.LikeTable;
import com.ssafy.crit.boards.repository.LikeRepository;
import com.ssafy.crit.boards.service.dto.LikeDto;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeService {

	private final LikeRepository likeRepository;
	private final UserRepository userRepository;

	public LikeDto like(User user , Board board) {
		userRepository.findById(user.getId()).orElseThrow(() -> {
			return new IllegalArgumentException("아이디를 찾을 수 없습니다.");
		});

		if (likeRepository.findByUserAndBoard(user, board).isEmpty()) {
			LikeTable like = new LikeTable();
			like.setUser(user);
			like.setBoard(board);
			likeRepository.save(like);
		}

		return new LikeDto(board.getTitle(), user.getId());
	}

	public LikeDto unlike(User user, Board board) {
		likeRepository.deleteByUserAndBoard(user, board);
		LikeDto likeDto = new LikeDto(board.getTitle(), user.getId());
		return likeDto;
	}
}


