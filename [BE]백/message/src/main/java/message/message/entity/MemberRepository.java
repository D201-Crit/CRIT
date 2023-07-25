package message.message.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Member findByMembername(String membername);
	Member findByName(String name);
}
