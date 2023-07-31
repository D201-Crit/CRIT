package com.ssafy.crit.challenge.repository;

import com.ssafy.crit.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findAllByStartDateAfter(LocalDate curDate);

    List<Challenge> findAllByEndDateBefore(LocalDate curDate); // 끝난 챌린지 조회

    @Query("select c from Challenge c where c.startDate <= :curdate and c.endDate >= :curdate")
    List<Challenge> findAllOngoingChallenge(@Param("curdate") LocalDate curDate); // 현재 진행중 챌린지 조회

}
