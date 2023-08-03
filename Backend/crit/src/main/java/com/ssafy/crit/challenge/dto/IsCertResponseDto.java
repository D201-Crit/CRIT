package com.ssafy.crit.challenge.dto;

import com.ssafy.crit.challenge.entity.IsCert;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IsCertResponseDto {
    private Long id;
    private boolean certified;
    private String certTime;
    private String outTime;
    private String filePath;
    private Long challengeId;
    private String userId;

    public IsCertResponseDto(IsCert isCert) {
        this.id = isCert.getId();
        this.certified = isCert.isCertified();
        this.certTime = isCert.getCertTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd kk:mm"));
        this.outTime = isCert.getOutTime() == null ? "" : isCert.getOutTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd kk:mm"));
        this.filePath = isCert.getFilePath();
        this.challengeId = isCert.getChallenge().getId();
        this.userId = isCert.getUser().getId();
    }
}
