package com.ssafy.crit.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

import com.ssafy.crit.auth.entity.enumType.Grade;

@Getter
@NoArgsConstructor
public class LogInResponseDto {
    private String id;
    private String nickname;
    private String email;
    private String accessToken;
    private String refreshToken;
    private Date refreshTokenExpirationTime;
    private int exp;
    private Grade grade;
    private int cashPoint;
    private String imageUrl;

    @Builder
    public LogInResponseDto(String id, String nickname, String email, String accessToken, String refreshToken,
        Date refreshTokenExpirationTime, int exp, Grade grade, int cashPoint, String imageUrl) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.refreshTokenExpirationTime = refreshTokenExpirationTime;
        this.exp = exp;
        this.grade = grade;
        this.cashPoint = cashPoint;
        this.imageUrl = imageUrl;
    }
}
