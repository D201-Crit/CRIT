package crud.prac.domain.repository;


import crud.prac.domain.posts.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostsRepository extends JpaRepository<Posts, Long> {

    @Query("SELECT p from Posts p order by p.id DESC ")
    List<Posts> findAllDesc();
    @Query("SELECT p FROM Posts p WHERE p.title LIKE %:ti%")
    List<Posts> findByTitleContaining(@Param("ti") String ti);

    @Query("SELECT p FROM Posts p order by p.views DESC")
    List<Posts> orderbyviews();

    Optional<Posts> findByTitle(String title);
}
