package com.ssafy.crit.boards.repository;

import com.ssafy.crit.boards.entity.board.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<Board, Long> {

    // 타이틀 내림차순
    @Query("SELECT b from Board b order by b.title DESC ")
    Page<Board> findAllDesc(Pageable pageable);

    // 타이틀 오름차순
    @Query("SELECT b from Board b order by b.title ASC ")
    Page<Board> findAllAsc(Pageable pageable);

    // 조회순 내림차순
    @Query("SELECT p FROM Board p order by p.views DESC")
    Page<Board> orderByViewsDesc(Pageable pageable);

    // 조회순 오름차순
    @Query("SELECT p FROM Board p order by p.views ASC ")
    Page<Board> orderByViewsAsc(Pageable pageable);

    // 찾기 메서드
    @Query("SELECT b FROM Board b WHERE b.title LIKE %:ti%")
    Page<Board> findByTitleContaining(@Param("ti") String ti, Pageable pageable);
}
