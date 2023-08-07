package com.ssafy.crit.admin;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
public class AdminSaveResponseDto {

	private String amdinId;

	private String role;

	private String grade;

	@Builder
	public AdminSaveResponseDto(String amdinId, String role, String grade) {
		this.amdinId = amdinId;
		this.role = role;
		this.grade = grade;
	}
}
