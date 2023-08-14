package com.ssafy.crit.challenge.entity;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.boards.entity.Classification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Challenge {

    @Id
    @GeneratedValue
    @Column(name = "challenge_id")
    private Long id;

    private String name;

    private String info;

    @Enumerated(EnumType.STRING)
    private Cert cert;

    private int people;// 총인원

    private int money; // 참여비

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalTime startTime; // 시작 시간

    private LocalTime endTime; // 종료 시간

    private String filePath;
    private String fileName;

    @Enumerated(EnumType.STRING)
    private ChallengeStatus challengeStatus;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User createUser; // 챌린지 만든 사람

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Classification board; // 보드

    @OneToMany(mappedBy = "challenge")
    private List<IsCert> isCerts; // 챌린지별 인증을 모아 두는곳?

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_challenge_id")
    private ChallengeCategory challengeCategory;

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    private List<ChallengeUser> challengeUserList = new ArrayList<>(); //챌린지 유저 리스트

    /**
     *
     */
    public void addChallengeUser(ChallengeUser user) {
        this.challengeUserList.add(user);
    }

    public void addBoard(Classification classification) {
        this.board = classification;
    }

    public void setImg(String imgUrl) {
        this.filePath= imgUrl;
    }
    public void setChallengeStatus(ChallengeStatus challengeStatus) {
        this.challengeStatus = challengeStatus;
    }
}
