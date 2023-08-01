package com.ssafy.crit.challenge.repository;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.challenge.entity.IsCert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IsCertRepository extends JpaRepository<IsCert,Long> {
    List<IsCert> findAllByChallengeAndUser(Challenge challenge, User user);
}
