package com.ssafy.crit.boards.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.crit.boards.entity.Classification;

public interface ClassificationRepository extends JpaRepository<Classification,Long> {
}
