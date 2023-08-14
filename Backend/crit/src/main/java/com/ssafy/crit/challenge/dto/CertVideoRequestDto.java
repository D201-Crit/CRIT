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
    private int inTime;  // 자리에 있었던 시간
}
