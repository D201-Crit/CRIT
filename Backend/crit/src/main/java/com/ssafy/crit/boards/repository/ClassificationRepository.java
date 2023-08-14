package com.ssafy.crit.boards.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.crit.boards.entity.Classification;
/**
 * author : 강민승
 */
public interface ClassificationRepository extends JpaRepository<Classification,Long> {
	Optional<Classification> findByCategory(String classification);

}
