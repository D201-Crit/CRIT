package crud.prac.domain.repository.shorts;

import crud.prac.domain.post.Post;
import crud.prac.domain.shorts.Shorts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ShortsRepository extends JpaRepository<Shorts, Long> {
    @Query("SELECT s from Shorts s order by s.id DESC ")
    List<Shorts> findAllDesc();
    @Query("SELECT s FROM Shorts s WHERE s.title LIKE %:ti%")
    List<Shorts> findByTitleContaining(@Param("ti") String ti);

    @Query("SELECT s FROM Shorts s order by s.views DESC")
    List<Shorts> orderbyviews();

    Optional<Shorts> findByTitle(String title);

}
