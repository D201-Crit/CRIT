package com.ssafy.crit.boards.repository;

import java.util.List;

import com.ssafy.crit.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.board.LikeTable;

public interface LikeRepository extends JpaRepository<LikeTable,Long> {

    List<LikeTable> findByUserAndBoard(User user, Board board);
    Long deleteByUserAndBoard(User user, Board board);
}
