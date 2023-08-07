package com.ssafy.crit.admin;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.ssafy.crit.auth.entity.Follow;
import com.ssafy.crit.auth.entity.enumType.AuthProvider;
import com.ssafy.crit.auth.entity.enumType.Grade;
import com.ssafy.crit.auth.entity.enumType.Role;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SuperAdmin {

	@Id
	@Column(name = "user_id")
	private String id;

	@Column(nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	@Enumerated(EnumType.STRING)
	private Grade grade;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private AuthProvider authProvider;

	@Column(length = 300)
	private String refreshToken;

	private Date tokenExpirationTime;

	@Builder
	public SuperAdmin(String id, String password, Role role, Grade grade, AuthProvider authProvider,
		String refreshToken,
		Date tokenExpirationTime) {
		this.id = id;
		this.password = password;
		this.role = role;
		this.grade = grade;
		this.authProvider = authProvider;
		this.refreshToken = refreshToken;
		this.tokenExpirationTime = tokenExpirationTime;
	}

	public void updateRefreshToken(String refreshToken, Date refreshTokenExpirationTime) {
		this.refreshToken = refreshToken;
		this.tokenExpirationTime = refreshTokenExpirationTime;
	}
}
