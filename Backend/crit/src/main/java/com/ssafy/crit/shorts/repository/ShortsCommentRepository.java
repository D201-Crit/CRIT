package com.ssafy.crit.shorts.repository;

import com.ssafy.crit.shorts.entity.ShortsComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShortsCommentRepository extends JpaRepository<ShortsComment, Long> {
    Optional<ShortsComment> findById(Long shortsCommentId);
    List<ShortsComment> findAllByShortsId(Long shortsId);
}
