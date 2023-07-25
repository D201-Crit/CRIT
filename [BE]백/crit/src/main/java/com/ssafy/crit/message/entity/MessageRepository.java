package com.ssafy.crit.message.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Long> {
	List<Message> findAllByReceiver(Member member);
	List<Message> findAllBySender(Member member);
}
