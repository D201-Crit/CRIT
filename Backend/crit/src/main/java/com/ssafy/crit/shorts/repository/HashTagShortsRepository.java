package com.ssafy.crit.shorts.repository;

import com.ssafy.crit.shorts.entity.HashTagShorts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.beans.JavaBean;

public interface HashTagShortsRepository extends JpaRepository<HashTagShorts,Long> {
}
