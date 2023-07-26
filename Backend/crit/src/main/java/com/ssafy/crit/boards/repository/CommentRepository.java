package com.ssafy.crit.boards.repository;

import com.ssafy.crit.boards.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findAllByBoardId(Long boardId);
}
