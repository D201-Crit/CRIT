package com.ssafy.crit.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter // 테스트 위해서 생성 삭제하기
@Getter
public class SignUpRequestDto {
    private String id;
    private String email;
    private String password;
    private String nickname;
}
