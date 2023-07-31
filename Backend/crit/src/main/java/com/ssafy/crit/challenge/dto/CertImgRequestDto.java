package com.ssafy.crit.challenge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertImgRequestDto {
//    private Long challengeId;
    private MultipartFile file;
//    private LocalDateTime certTime;

}
