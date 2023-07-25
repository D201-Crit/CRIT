package com.ssafy.crit.domain.repository;

import crud.prac.domain.LikeTable;
import crud.prac.domain.User;
import crud.prac.domain.posts.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeTableRepository extends JpaRepository<LikeTable,Long> {

    List<LikeTable> findByUserAndPosts(User user, Posts posts);
    Long deleteByUserAndPosts(User user, Posts posts);
}
