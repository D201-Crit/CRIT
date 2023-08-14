package com.ssafy.crit.message.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.message.entity.Message;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MessageDto {


    private Long id;
    private String title;
    private String content;
    private String senderName;
    private String receiverName;
    private List<String> following;
    private List<String> follower;

    public static MessageDto toDto(Message message, User user) {

        // lambda를 통해 List
        List<String> followerNames = user.getFollowers().stream()
            .map(follow -> follow.getFollower().getNickname())
            .collect(Collectors.toList());

        List<String> followingNames = user.getFollowings().stream()
            .map(follow -> follow.getFollowing().getNickname())
            .collect(Collectors.toList());


        return new MessageDto(
                message.getId(),
                message.getTitle(),
                message.getContent(),
                message.getSender().getNickname(),
                message.getReceiver().getNickname(),
            followingNames,
            followerNames
        );
    }
}
