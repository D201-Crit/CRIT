package com.ssafy.crit.challenge.entity;

import com.ssafy.crit.auth.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


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

    @ColumnDefault("false")
    private boolean isCertified;

    // 인증시간
    @CreationTimestamp
    private LocalDateTime certTime;

    // 이탈시간
    private LocalTime absentTime;
    
    // 자리 있었던 시간
    private LocalTime presenceTime;
    
    private int percentage; // 자리에 있었던 비율

    private String filePath; // 이미지 저장 경로

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    public void certification(boolean bool) {
        this.isCertified = bool;
    }

    public void setOutTime(LocalTime absentTime) {
        this.absentTime = absentTime;
    }

    public void setPresenceTime(LocalTime presenceTime){
        this.presenceTime = presenceTime;
    }

    public void setPercentage(int percentage){
        this.percentage = percentage;
    }

}