package com.ssafy.crit.challenge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CertVideoRequestDto {
    private Long challengeId;  // 해당 챌린지
    private int outTime;  // 이탈 시간
    private boolean certified; // 인증 여부
}
