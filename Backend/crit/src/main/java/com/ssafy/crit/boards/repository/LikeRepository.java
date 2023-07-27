package com.ssafy.crit.boards.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.crit.boards.entity.Board;
import com.ssafy.crit.boards.entity.LikeTable;
import com.ssafy.crit.imsimember.entity.Member;

public interface LikeRepository extends JpaRepository<LikeTable,Long> {

    List<LikeTable> findByMemberAndBoard(Member member, Board board);
    Long deleteByMemberAndBoard(Member member, Board board);
}
