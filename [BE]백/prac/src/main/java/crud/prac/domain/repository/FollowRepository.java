package crud.prac.domain.repository;

import crud.prac.domain.Follow;
import crud.prac.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerAndFollowing(User follower, User following);
    Long deleteByFollowerAndFollowing(User follower, User following);
}
