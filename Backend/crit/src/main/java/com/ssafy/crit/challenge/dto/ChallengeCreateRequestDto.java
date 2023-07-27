package com.ssafy.crit.challenge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.crit.challenge.entity.Cert;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
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

    @JsonFormat(pattern = "kk:mm:ss")
    private LocalTime startTime; // 시작 시간
    @JsonFormat(pattern = "kk:mm:ss")
    private LocalTime endTime; // 종료 시간
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate; // 시작 기간
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate; // 종료 기간
}
