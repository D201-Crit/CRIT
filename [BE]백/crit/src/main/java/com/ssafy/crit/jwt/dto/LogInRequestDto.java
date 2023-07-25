package com.ssafy.crit.jwt.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LogInRequestDto {
    private String id;
    private String password;
}
