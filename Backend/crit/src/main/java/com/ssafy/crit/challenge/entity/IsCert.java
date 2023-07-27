package com.ssafy.crit.challenge.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.crit.imsimember.entity.Member;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class IsCert {

    @Id
    @GeneratedValue
    @Column(name = "is_cert_id")
    private Long id;

    @ColumnDefault("FALSE")
    private Boolean isCert;

    // 인증시간
    private int certTime;

    // 이탈시간
    private int outTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Member user;


}