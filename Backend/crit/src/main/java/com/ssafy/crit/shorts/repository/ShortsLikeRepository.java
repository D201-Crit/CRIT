package com.ssafy.crit.shorts.repository;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.shorts.entity.Shorts;
import com.ssafy.crit.shorts.entity.ShortsLikeTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShortsLikeRepository extends JpaRepository<ShortsLikeTable, Long> {
    List<ShortsLikeTable> findByUserAndShorts(User user, Shorts shorts);

    Long deleteByUserAndShorts(User user, Shorts shorts);
}
