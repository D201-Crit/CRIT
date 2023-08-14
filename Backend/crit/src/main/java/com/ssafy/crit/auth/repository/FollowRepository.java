package com.ssafy.crit.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.crit.auth.entity.Follow;
import com.ssafy.crit.auth.entity.User;
import org.springframework.transaction.annotation.Transactional;

/**
 * author : 강민승
 */
public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Modifying
    @Transactional
    @Query("delete from Follow f where f.follower = :me and f.following = :you")
    void deleteFollow(@Param("you") User you, @Param("me") User me);


    @Query("select f from Follow f where f.follower = :me")
    List<Follow> findByMyFollowings(@Param("me") User me);

    Boolean findByFollowerAndAndFollowing(User me, User you);
}
