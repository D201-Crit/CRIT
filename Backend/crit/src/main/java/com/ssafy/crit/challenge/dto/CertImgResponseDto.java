package com.ssafy.crit.challenge.dto;

import com.ssafy.crit.challenge.entity.IsCert;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CertImgResponseDto {
    private Long challengeId;
    private boolean isCertificated;
    private boolean isFinished;

    public CertImgResponseDto(IsCert isCert) {
        this.challengeId = isCert.getChallenge().getId();
        this.isCertificated = isCert.isCertified();
        this.isFinished = isCert.isFinished();
    }
}
