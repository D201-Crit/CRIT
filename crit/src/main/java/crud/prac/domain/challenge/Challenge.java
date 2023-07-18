package crud.prac.domain.challenge;

import crud.prac.domain.post.Board;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * * 230718
 * * 챌린지 엔티티
 * * by 조경호
 * * 수정 필요
 */

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Challenge {

    @Id
    @GeneratedValue
    @Column(name = "challenge_id")
    private Long id;

    private String name; // 챌린지 이름

    private String info; // 챌린지 정보

    private LocalDateTime startDate; // 챌린지 시작 일자 (챌린지가 시작하는 일자)

    private int plusDate; // 챌린지 기간 차이
//    private LocalDateTime endDate; // 뭐가 나을지?

    private LocalDateTime startTime; // 해당 챌린지가 몇시에 시작하는지

    private int challengeTime; // 챌린지 소요 시간
//    private LocalDateTime endTime; // 뭐가 나을지?

    @Enumerated(EnumType.STRING)
    private CertificationType type; // 인증 타입

    private Boolean offline;
    /**
     * 이걸 인증 타입에 넣는건 어떤지?
     */

    private LocalDateTime initDate; // 챌린지 생성 날짜

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_cate_id")
    private ChallengeCategory category;
    
    private int cost;  // 챌린지 금액

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "board_id")
    private Board board; // 챌린지 게시판

    @OneToMany(mappedBy = "challenge")
    private List<ChallengeUser> challengeUsers = new ArrayList<>(); // 챌린지 유저 리스트



}
