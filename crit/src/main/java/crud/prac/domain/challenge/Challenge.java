package crud.prac.domain.challenge;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * * 230718
 * * 챌린지 엔티티
 * * by 조경호
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
    private Certification certification; // 인증 타입

    private Boolean offline;

    private LocalDateTime localDateTime;



}
