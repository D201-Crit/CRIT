package com.ssafy.crit.challenge.entity;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.ssafy.crit.boards.entity.Board;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Challenge {

    @Id
    @GeneratedValue
    @Column(name = "challenge_id")
    private Long id;

    private String name;

    private String info;

    private int doingTime;

    @Enumerated(EnumType.STRING)
    private Cert cert;

    private int people; // 총인원

    private int money; // 참여비

    @CreationTimestamp
    private LocalDateTime initDate; // 생성일

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board; // 보드

    @OneToMany(mappedBy = "challenge")
    private List<IsCert> isCerts; // 챌린지별 인증을 모아 두는곳?

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_challenge_id")
    private ChallengeCategory challengeCategory;
    /**
     * 챌린지 카테고리는 1대1이면 가능하지 않을까?
     */

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    private List<ChallengeUser> challengeUserList = new ArrayList<>(); //챌린지 유저 리스트
}
