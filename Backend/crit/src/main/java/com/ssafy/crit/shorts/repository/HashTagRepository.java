package com.ssafy.crit.shorts.repository;

import com.ssafy.crit.shorts.entity.HashTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashTagRepository extends JpaRepository<HashTag, Long> {
    HashTag findByHashTag(String hashTag);
}

