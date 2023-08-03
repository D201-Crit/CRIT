package com.ssafy.crit.message.dto;


import com.ssafy.crit.message.entity.Message;
import lombok.*;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MessageSendRequestDto {

    private String title;
    private String content;
    private String receiverName;

    @Builder
    public static MessageSendRequestDto toDto(Message message) {
        return new MessageSendRequestDto(
                message.getTitle(),
                message.getContent(),
                message.getReceiver().getId()
        );
    }
}