package com.ssafy.crit.challenge.repository;

import com.ssafy.crit.challenge.entity.ChallengeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChallengeCategoryRepository extends JpaRepository<ChallengeCategory,Long> {

    Optional<ChallengeCategory> findChallengeCategoryBySpecies(String species);
}
