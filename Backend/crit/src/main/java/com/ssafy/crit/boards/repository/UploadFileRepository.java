package com.ssafy.crit.boards.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.crit.boards.entity.feeds.UploadFile;

public interface UploadFileRepository extends JpaRepository<UploadFile,Long> {
}
