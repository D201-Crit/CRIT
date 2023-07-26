package message.message.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import message.message.entity.Message;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MessageDto {


	private String title;
	private String content;
	private String senderName;
	private String receiverName;

	public static MessageDto toDto(Message message) {
		return new MessageDto(
			message.getTitle(),
			message.getContent(),
			message.getSender().getName(),
			message.getReceiver().getName()
		);
	}
}
