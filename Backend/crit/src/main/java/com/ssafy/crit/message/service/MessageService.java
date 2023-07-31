package com.ssafy.crit.message.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.message.dto.MessageDto;
import com.ssafy.crit.message.dto.MessageSendRequestDto;
import com.ssafy.crit.message.entity.Message;
import com.ssafy.crit.message.entity.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageService {

	private final MessageRepository messageRepository;
	private final UserRepository userRepository;

	@Transactional
	public MessageDto write(MessageSendRequestDto MessageSendRequestDto, String senderName) {
		User receiver = userRepository.findById(MessageSendRequestDto.getReceiverName()).get();
		User sender = userRepository.findById(senderName).orElseThrow(() -> {
			return new IllegalArgumentException("유저를 찾을 수 없습니다.");
		});

		Message message = Message.builder()
				.title(MessageSendRequestDto.getTitle())
				.content(MessageSendRequestDto.getContent())
				.receiver(receiver)
				.sender(sender)
				.deletedByReceiver(false)
				.deletedBySender(false)
				.build();

		messageRepository.save(message);

		return MessageDto.toDto(message);
	}



	@Transactional(readOnly = true)
	public List<MessageDto> receivedMessage(User user) {
		// 받은 편지함 불러오기
		// 한 명의 유저가 받은 모든 메시지
		// 추후 JWT를 이용해서 재구현 예정
		List<Message> messages = messageRepository.findAllByReceiver(user);
		List<MessageDto> messageDtos = new ArrayList<>();

		for(Message message : messages) {
			// message 에서 받은 편지함에서 삭제하지 않았으면 보낼 때 추가해서 보내줌
			if(!message.isDeletedByReceiver()) {
				messageDtos.add(MessageDto.toDto(message));
			}
		}
		return messageDtos;
	}

	// 받은 편지 삭제
	@Transactional
	public Object deleteMessageByReceiver(Long id, User user) {
		Message message = messageRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("메시지를 찾을 수 없습니다.");
		});

		if(user == message.getSender()) {
			message.deleteByReceiver(); // 받은 사람에게 메시지 삭제
			if (message.isDeleted()) {
				// 받은사람과 보낸 사람 모두 삭제했으면, 데이터베이스에서 삭제요청
				messageRepository.delete(message);
				return "양쪽 모두 삭제";
			}
			return "한쪽만 삭제";
		} else {
			return new IllegalArgumentException("유저 정보가 일치하지 않습니다.");
		}
	}
	@Transactional(readOnly = true)
	public List<MessageDto> sentMessage(User user) {
		// 보낸 편지함 불러오기
		// 한 명의 유저가 받은 모든 메시지
		// 추후 JWT를 이용해서 재구현 예정
		List<Message> messages = messageRepository.findAllBySender(user);
		List<MessageDto> messageDtos = new ArrayList<>();

		for(Message message : messages) {
			// message 에서 받은 편지함에서 삭제하지 않았으면 보낼 때 추가해서 보내줌
			if(!message.isDeletedBySender()) {
				messageDtos.add(MessageDto.toDto(message));
			}
		}
		return messageDtos;
	}


	// 보낸 편지 삭제
	@Transactional
	public Object deleteMessageBySender(Long id, User user) {
		Message message = messageRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("메시지를 찾을 수 없습니다.");
		});

		if(user == message.getSender()) {
			message.deleteBySender(); // 받은 사람에게 메시지 삭제
			if (message.isDeleted()) {
				// 받은사람과 보낸 사람 모두 삭제했으면, 데이터베이스에서 삭제요청
				messageRepository.delete(message);
				return "양쪽 모두 삭제";
			}
			return "한쪽만 삭제";
		} else {
			return new IllegalArgumentException("유저 정보가 일치하지 않습니다.");
		}


	}
}