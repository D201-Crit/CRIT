package com.ssafy.crit.boards.repository;

import java.util.List;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.boards.entity.Classification;
import com.ssafy.crit.boards.entity.board.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * author : 강민승
 */
public interface BoardRepository extends JpaRepository<Board, Long> {

    // 조회순 내림차순
    @Query("SELECT p FROM Board p where p.classification.category = :category order by p.views DESC")
    Page<Board> orderByViewsDesc(Pageable pageable, @Param("category")String category);

    // 조회순 오름차순
    @Query("SELECT p FROM Board p where p.classification.category = :category order by p.views ASC ")
    Page<Board> orderByViewsAsc(Pageable pageable, @Param("category")String category);

    // 좋아요순 내림차순
    @Query("SELECT p FROM Board p where p.classification.category = :category order by p.likes.size DESC")
    Page<Board> orderByLikesDesc(Pageable pageable, @Param("category")String category);

    // 좋아요순 오름차순
    @Query("SELECT p FROM Board p where p.classification.category = :category order by p.likes.size ASC")
    Page<Board> orderByLikesAsc(Pageable pageable, @Param("category")String category);

    // 찾기 메서드
    @Query("SELECT b FROM Board b WHERE b.title LIKE %:ti% and b.classification.category = :category ")
    Page<Board> findByTitleContaining(@Param("ti") String ti, @Param("category")String category, Pageable pageable);

    @Query("select b from Board b where b.classification.category = :category")
    Page<Board> findAllByClassificationCategory(Pageable pageable, @Param("category") String category);

    @Query("select b from Board b where b.classification.category = :category")
    List<Board> findAllByCategory(@Param("category") String category);

    Page<Board> findByClassificationAndUser(Pageable pageable, Classification classification, User user);


    Page<Board> findAllByUserAndClassification(User user, Classification classification, Pageable pageable);


    Page<Board> findAllByUser(User user, Pageable pageable);


}