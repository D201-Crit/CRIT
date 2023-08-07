package com.ssafy.crit.admin;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

import com.ssafy.crit.auth.entity.enumType.Grade;

@Getter
@NoArgsConstructor
public class AdminLogInResponseDto {
    private String id;
    private String accessToken;
    private String refreshToken;
    private Date refreshTokenExpirationTime;
    private Grade grade;

    @Builder
    public AdminLogInResponseDto(String id, String accessToken, String refreshToken, Date refreshTokenExpirationTime,
        Grade grade) {
        this.id = id;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.refreshTokenExpirationTime = refreshTokenExpirationTime;
        this.grade = grade;
    }
}
