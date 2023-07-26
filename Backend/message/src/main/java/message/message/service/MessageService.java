package message.message.service;

import lombok.RequiredArgsConstructor;
import message.message.dto.MessageDto;
import message.message.entity.Member;
import message.message.entity.MemberRepository;
import message.message.entity.Message;
import message.message.entity.MessageRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageService {

	private final MessageRepository messageRepository;
	private final MemberRepository  memberRepository;

	@Transactional
	public MessageDto write(MessageDto messageDto) {
		Member receiver = memberRepository.findByName(messageDto.getReceiverName());
		Member sender = memberRepository.findByName(messageDto.getSenderName());

		Message message = new Message();
		message.setReceiver(receiver);
		message.setSender(sender);

		message.setTitle(messageDto.getTitle());
		message.setContent(messageDto.getContent());
		message.setDeletedByReceiver(false);
		message.setDeletedBySender(false);
		messageRepository.save(message);

		return MessageDto.toDto(message);
	}


	@Transactional(readOnly = true)
	public List<MessageDto> receivedMessage(Member member) {
		// 받은 편지함 불러오기
		// 한 명의 유저가 받은 모든 메시지
		// 추후 JWT를 이용해서 재구현 예정
		List<Message> messages = messageRepository.findAllByReceiver(member);
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
	public Object deleteMessageByReceiver(Long id, Member member) {
		Message message = messageRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("메시지를 찾을 수 없습니다.");
		});

		if(member == message.getSender()) {
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
	public List<MessageDto> sentMessage(Member member) {
		// 보낸 편지함 불러오기
		// 한 명의 유저가 받은 모든 메시지
		// 추후 JWT를 이용해서 재구현 예정
		List<Message> messages = messageRepository.findAllBySender(member);
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
	public Object deleteMessageBySender(Long id, Member member) {
		Message message = messageRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("메시지를 찾을 수 없습니다.");
		});

		if(member == message.getSender()) {
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