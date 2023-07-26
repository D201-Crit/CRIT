package com.crit.oauthjwt2.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;

@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class KakaoUserInfo {
    private Long id;
    private KakaoAccount kakaoAccount;

    @Getter
    public class KakaoAccount {
        private String email;
        private Profile profile;

        @Getter
        public class Profile {
            private String nickname;
            private String profileImageUrl;
        }
    }
}