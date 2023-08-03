package com.ssafy.crit.auth.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.crit.auth.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
	private String id;

	private String nickname;

	private List<String> followers = new ArrayList<>();

	private List<String> followings = new ArrayList<>();


	@Builder
	public static UserResponseDto toUserResponseDto(User user) {
		List<String> followerNames = user.getFollowers().stream()
			.map(follow -> follow.getFollowing().getId())
			.collect(Collectors.toList());

		List<String> followingNames = user.getFollowings().stream()
			.map(follow -> follow.getFollower().getId())
			.collect(Collectors.toList());

		return new UserResponseDto(
			user.getId(),
			user.getNickname(),
			followerNames,
			followingNames
		);
	}
}
