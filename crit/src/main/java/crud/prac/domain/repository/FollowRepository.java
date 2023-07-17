package crud.prac.domain.repository;

import crud.prac.domain.Follow;
import crud.prac.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerAndFollowing(Member follower, Member following);
    Long deleteByFollowerAndFollowing(Member follower, Member following);
}
