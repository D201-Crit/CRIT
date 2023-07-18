package crud.prac.domain.repository;

import crud.prac.domain.post.PostLikeTable;
import crud.prac.domain.post.Post;
import crud.prac.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeTableRepository extends JpaRepository<PostLikeTable,Long> {
    List<PostLikeTable> findByUserAndPosts(Member member, Post posts);
    Long deleteByUserAndPosts(Member member, Post posts);
}