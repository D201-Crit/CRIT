package com.ssafy.crit.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateProfilePictureDto {
	private String user;
	private String profileImageUrl;

	public UpdateProfilePictureDto(String user, String profileImageUrl) {
		this.user = user;
		this.profileImageUrl = profileImageUrl;
	}
}
