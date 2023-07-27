package com.ssafy.crit.imsimember.repository;

import com.ssafy.crit.imsimember.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByMembername(String membername);
	Optional<Member> findByName(String name);
}
