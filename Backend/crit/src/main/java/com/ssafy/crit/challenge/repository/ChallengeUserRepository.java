package com.ssafy.crit.challenge.repository;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.challenge.entity.ChallengeUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChallengeUserRepository extends JpaRepository<ChallengeUser,Long> {
    Optional<ChallengeUser> findByChallengeAndUser(Challenge challenge, User user);

    List<ChallengeUser> findAllByUser(User user);
}
