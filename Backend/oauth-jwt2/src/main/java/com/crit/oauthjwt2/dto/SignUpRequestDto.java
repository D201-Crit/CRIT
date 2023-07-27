package com.crit.oauthjwt2.dto;

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
