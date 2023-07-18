package crud.prac.domain.challenge;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * * 230718
 * * 챌린지 카테고리 엔티티
 * * by 조경호
 */

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ChallengeCategory {

    @Id
    @GeneratedValue
    @Column(name = "challenge_cate_id")
    private Long id;

    private String category; // 카테고리 명

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    private List<Challenge> challenges = new ArrayList<>(); // 카테고리에 속하는 챌린지들

    @CreationTimestamp
    private LocalDateTime initDate; // 카테고리 생성 날짜

}
