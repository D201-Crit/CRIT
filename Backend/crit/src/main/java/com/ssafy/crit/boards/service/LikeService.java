package com.ssafy.crit.boards.service;


import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.board.LikeTable;
import com.ssafy.crit.boards.repository.LikeRepository;
import com.ssafy.crit.boards.service.dto.LikeDto;

import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

/**
 * author : 강민승
 */

@Service
@RequiredArgsConstructor
@Transactional
public class LikeService {

	private final LikeRepository likeRepository;
	private final UserRepository userRepository;

	public LikeDto like(User user , Board board) {
		userRepository.findById(user.getId()).orElseThrow(() -> {
			return new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
		});

		if (likeRepository.findByUserAndBoard(user, board).isEmpty()) {
			LikeTable like = new LikeTable();
			like.setUser(user);
			like.setBoard(board);
			likeRepository.save(like);
		}

		return new LikeDto(board.getTitle(), board.getClassification().getCategory() , user.getNickname(), board.getLikes().size() + 1);
	}

	public LikeDto unlike(User user, Board board) {
		likeRepository.deleteByUserAndBoard(user, board);
		LikeDto likeDto = new LikeDto(board.getTitle(), board.getClassification().getCategory(), user.getNickname(),
			board.getLikes().size());
		return likeDto;
	}
}


