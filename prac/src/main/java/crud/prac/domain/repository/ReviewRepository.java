package crud.prac.domain.repository;

import crud.prac.domain.posts.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
