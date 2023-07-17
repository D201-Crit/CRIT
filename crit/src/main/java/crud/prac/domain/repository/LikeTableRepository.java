package crud.prac.domain.repository;

import crud.prac.domain.LikeTable;
import crud.prac.domain.Posts;
import crud.prac.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeTableRepository extends JpaRepository<LikeTable,Long> {
    List<LikeTable> findByUserAndPosts(Member member, Posts posts);
    Long deleteByUserAndPosts(Member member, Posts posts);
}