package com.ssafy.crit.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.crit.auth.entity.Follow;
import com.ssafy.crit.auth.entity.User;
/**
 * author : 강민승
 */
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerAndFollowing(User follower, User following);
    Long deleteByFollowerAndFollowing(User follower, User following);

    @Query("select m.following from Follow m where m.follower = :me ")
    List<Follow> findByMyFollowings(@Param("me") User me);
}
