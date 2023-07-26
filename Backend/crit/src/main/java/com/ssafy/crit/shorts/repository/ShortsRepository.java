package com.ssafy.crit.shorts.repository;

import com.ssafy.crit.shorts.entity.Shorts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortsRepository extends JpaRepository<Shorts,Long> {
}
