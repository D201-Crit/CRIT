package crud.prac.domain.repository;

import crud.prac.domain.LikeTable;
import crud.prac.domain.posts.Posts;
import crud.prac.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeTableRepository extends JpaRepository<LikeTable,Long> {

    List<LikeTable> findByUserAndPosts(User user, Posts posts);
    Long deleteByUserAndPosts(User user, Posts posts);
}
