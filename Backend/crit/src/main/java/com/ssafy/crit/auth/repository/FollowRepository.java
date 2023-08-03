package com.ssafy.crit.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.crit.auth.entity.Follow;
import com.ssafy.crit.auth.entity.User;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerAndFollowing(User follower, User following);
    Long deleteByFollowerAndFollowing(User follower, User following);
}
