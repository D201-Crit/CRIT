package com.ssafy.crit.jwt.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LogOutRequestDto {
    private String accessToken;
    private String refreshToken;
}
