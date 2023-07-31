package com.ssafy.crit.message.dto;

import com.ssafy.crit.message.entity.Message;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
