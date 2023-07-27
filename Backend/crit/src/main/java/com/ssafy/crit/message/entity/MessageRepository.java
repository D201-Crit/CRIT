package com.ssafy.crit.message.entity;

import com.ssafy.crit.imsimember.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Long> {
	List<Message> findAllByReceiver(Member member);
	List<Message> findAllBySender(Member member);
}
