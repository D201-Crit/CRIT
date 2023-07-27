package com.ssafy.crit.challenge.dto;

import com.ssafy.crit.challenge.entity.Cert;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeCreateRequestDto {
    private String title;
    private String info;
    private String category;
    private Cert cert; // 인증 타입
    private int people; // 인원수
    private int money; // 돈
    private LocalTime doingTime;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
