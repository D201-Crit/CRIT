package com.crit.oauthjwt2.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LogInRequestDto {
    private String id;
    private String password;
}
