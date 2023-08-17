package com.ssafy.crit.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UpdateProfilePictureDto {
	private String profileImageUrl;

	@Builder
	public UpdateProfilePictureDto(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}
}
