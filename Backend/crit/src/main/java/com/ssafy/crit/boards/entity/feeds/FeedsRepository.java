package com.ssafy.crit.boards.entity.feeds;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.crit.boards.entity.board.Board;

public interface FeedsRepository extends JpaRepository<Board,Long> {
}
