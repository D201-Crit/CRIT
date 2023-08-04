package com.ssafy.crit.boards.repository;

import java.util.List;

import com.ssafy.crit.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.board.LikeTable;

public interface LikeRepository extends JpaRepository<LikeTable,Long> {

    List<LikeTable> findByUserAndBoard(User user, Board board);

    @Modifying
    @Query("delete from LikeTable l where l.user = :user and l.board = :board")
    int deleteByUserAndBoard(@Param("user") User user, @Param("board") Board board);

}
