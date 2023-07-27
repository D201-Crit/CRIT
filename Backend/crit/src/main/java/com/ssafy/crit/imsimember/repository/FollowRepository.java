package com.ssafy.crit.imsimember.repository;

import com.ssafy.crit.imsimember.entity.Follow;
import com.ssafy.crit.imsimember.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerAndFollowing(Member follower, Member following);
    Long deleteByFollowerAndFollowing(Member follower, Member following);
}
