package com.ssafy.crit.boards.repository;


import com.ssafy.crit.boards.entity.board.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findAllByBoardId(Long boardId);

    // 내용 내림차순
    @Query("SELECT b from Comment b order by b.content DESC ")
    List<Comment> findAllDesc();

    // 내용 오름차순
    @Query("SELECT b from Comment b order by b.content ASC ")
    List<Comment> findAllAsc();

    // comment 생성 순..?
    @Query("SELECT b from Comment b order by b.id ASC ")
    List<Comment> SortByIdAsc();

    // Comment 생선 역순
    @Query("SELECT b from Comment b order by b.id DESC ")
    List<Comment> SortByIdDesc();

}
