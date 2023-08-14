package com.ssafy.crit.shorts.repository;

import com.ssafy.crit.shorts.entity.HashTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HashTagRepository extends JpaRepository<HashTag, Long> {
    Optional<HashTag> findByHashTag(String hashTag);
}

