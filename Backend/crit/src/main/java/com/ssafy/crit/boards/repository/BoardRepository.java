package com.ssafy.crit.boards.repository;

import com.ssafy.crit.boards.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    // 타이틀 내림차순
    @Query("SELECT b from Board b order by b.title DESC ")
    List<Board> findAllDesc();

    // 타이틀 오름차순
    @Query("SELECT b from Board b order by b.title ASC ")
    List<Board> findAllAsc();

    // 조회순 내림차순
    @Query("SELECT p FROM Board p order by p.views DESC")
    List<Board> orderByViewsDesc();

    // 조회순 오름차순
    @Query("SELECT p FROM Board p order by p.views ASC ")
    List<Board> orderByViewsAsc();

    // 찾기 메서드
    @Query("SELECT b FROM Board b WHERE b.title LIKE %:ti%")
    List<Board> findByTitleContaining(@Param("ti") String ti);
}
