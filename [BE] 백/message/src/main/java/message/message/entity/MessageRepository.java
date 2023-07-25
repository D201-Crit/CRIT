package message.message.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import message.message.dto.MessageDto;

public interface MessageRepository extends JpaRepository<Message,Long> {
	List<Message> findAllByReceiver(Member member);
	List<Message> findAllBySender(Member member);
}
