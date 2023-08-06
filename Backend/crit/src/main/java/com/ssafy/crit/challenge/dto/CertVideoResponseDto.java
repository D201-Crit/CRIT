package com.ssafy.crit.challenge.dto;

import com.ssafy.crit.challenge.entity.IsCert;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CertVideoResponseDto {
    private Long challengeId;
    private boolean isCertificated;
    private String absentTime;
    private String presenceTime;
    private String percentage;

    public CertVideoResponseDto(IsCert isCert){
        this.challengeId = isCert.getChallenge().getId();
        this.isCertificated = isCert.isCertified();
        this.absentTime = isCert.getAbsentTime().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        this.presenceTime = isCert.getPresenceTime().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        this.percentage = String.valueOf(isCert.getPercentage());
    }
}
