package crud.prac.domain.challenge;

import crud.prac.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * * 230718
 * * 챌린지 유저 엔티티
 * * by 조경호
 */

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeUser {
    @Id
    @GeneratedValue
    @Column(name = "challenge_user_id")
    private Long id;

    @CreationTimestamp
    private LocalDateTime initDate; // 해당 챌린지 참여 일자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // 챌린지 참여하는 멤버

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge; // 해당 챌린지

}
