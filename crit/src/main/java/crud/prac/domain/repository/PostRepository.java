package crud.prac.domain.repository;


import crud.prac.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p from Post p order by p.id DESC ")
    List<Post> findAllDesc();
    @Query("SELECT p FROM Post p WHERE p.title LIKE %:ti%")
    List<Post> findByTitleContaining(@Param("ti") String ti);

    @Query("SELECT p FROM Post p order by p.views DESC")
    List<Post> orderbyviews();

    Optional<Post> findByTitle(String title);
}
