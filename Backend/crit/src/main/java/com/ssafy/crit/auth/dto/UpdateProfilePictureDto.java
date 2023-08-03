package com.ssafy.crit.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UpdateProfilePictureDto {
	private String profileImageUrl;
	private String profileImageName;

	@Builder
	public UpdateProfilePictureDto(String profileImageUrl, String profileImageName) {
		this.profileImageUrl = profileImageUrl;
		this.profileImageName = profileImageName;
	}
}
