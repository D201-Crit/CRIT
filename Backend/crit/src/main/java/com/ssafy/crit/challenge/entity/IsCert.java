package com.ssafy.crit.challenge.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.crit.auth.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IsCert {

    @Id
    @GeneratedValue
    @Column(name = "is_cert_id")
    private Long id;

    @ColumnDefault("FALSE")
    private Boolean isCert;

    // 인증시간
    private LocalDateTime certTime;

    // 이탈시간
    private LocalDateTime outTime;

    private String filename; // 이미지 이름

    private String filepath; // 이미지 저장 경로

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


}