package com.ssafy.crit.boards.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.crit.boards.entity.feeds.UploadFile;

public interface UploadFileRepository extends JpaRepository<UploadFile,Long> {

	@Query("select m from UploadFile m where m.board.id = :id")
	List<UploadFile> findAllByBoardsId(@Param("id") Long id);
}
