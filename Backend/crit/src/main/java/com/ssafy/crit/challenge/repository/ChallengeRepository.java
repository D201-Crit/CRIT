package com.ssafy.crit.challenge.repository;

import com.ssafy.crit.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
}
