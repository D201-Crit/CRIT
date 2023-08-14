package com.ssafy.crit.admin;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdminLoginRequestDto {
    private String id;
    private String password;
}
