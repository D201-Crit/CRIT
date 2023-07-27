package com.ssafy.crit.challenge.repository;

import com.ssafy.crit.challenge.entity.ChallengeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeCategoryRepository extends JpaRepository<ChallengeCategory,Long> {
}
