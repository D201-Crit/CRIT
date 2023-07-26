package com.ssafy.crit.imsimember.repository;

import com.ssafy.crit.imsimember.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Member findByMembername(String membername);
	Member findByName(String name);
}
