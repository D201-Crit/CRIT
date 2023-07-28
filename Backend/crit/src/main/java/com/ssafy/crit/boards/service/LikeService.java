package com.ssafy.crit.boards.service;


import com.ssafy.crit.boards.entity.Board;
import com.ssafy.crit.boards.entity.LikeTable;
import com.ssafy.crit.boards.repository.LikeRepository;
import com.ssafy.crit.imsimember.entity.Member;
import com.ssafy.crit.imsimember.repository.MemberRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Service
@RequiredArgsConstructor
public class LikeService {

	private final LikeRepository likeRepository;
	private final MemberRepository memberRepository;

	public LikeDto like(Member member , Board board) {
		memberRepository.findByName(member.getName()).orElseThrow();
		if (likeRepository.findByMemberAndBoard(member, board).isEmpty()) {
			LikeTable like = new LikeTable();
			like.setMember(member);
			like.setBoard(board);
			likeRepository.save(like);
		}

		return new LikeDto(board.getTitle(), member.getName());
	}

	public LikeDto unlike(Member member, Board board) {
		likeRepository.deleteByMemberAndBoard(member, board);
		return new LikeDto(board.getTitle(), member.getName());
	}
}


