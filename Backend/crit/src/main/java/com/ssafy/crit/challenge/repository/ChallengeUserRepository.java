package com.ssafy.crit.challenge.repository;

import com.ssafy.crit.challenge.entity.ChallengeUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeUserRepository extends JpaRepository<ChallengeUser,Long> {
}
