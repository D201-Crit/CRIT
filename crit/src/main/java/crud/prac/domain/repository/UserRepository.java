package crud.prac.domain.repository;

import crud.prac.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByNickname(String nickname);
}
