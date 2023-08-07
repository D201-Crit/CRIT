package com.ssafy.crit.shorts.repository;

import com.ssafy.crit.shorts.entity.Shorts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShortsRepository extends JpaRepository<Shorts,Long> {
    List<Shorts> findAllByOrderByViewsDesc();

    List<Shorts> findAllByOrderByCreatedDateDesc();

    List<Shorts> findAllByOrderByLikesDesc();
}
