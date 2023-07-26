package com.ssafy.crit.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class SignUpRequestDto {
    private String id;
    private String email;
    private String password;
    private String nickname;
}
