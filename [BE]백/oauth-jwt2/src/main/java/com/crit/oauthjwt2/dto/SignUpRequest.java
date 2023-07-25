package com.crit.oauthjwt2.dto;

import com.crit.oauthjwt2.enumType.AuthProvider;
import lombok.Getter;

@Getter
public class SignUpRequest {
    private String id;
    private String email;
    private String nickname;
    private String profileImageUrl;
    private AuthProvider authProvider;
}
