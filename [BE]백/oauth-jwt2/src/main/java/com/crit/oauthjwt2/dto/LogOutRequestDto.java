package com.crit.oauthjwt2.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LogOutRequestDto {
    private String accessToken;
    private String refreshToken;
}
