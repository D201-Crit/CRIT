package crud.prac.domain.challenge;

import crud.prac.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Certification {
    @Id
    @GeneratedValue
    @Column(name = "certification_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private CertificationStatus status; // 인증 상태, 체크 or 언체크

    private LocalDateTime emptyTime; // 자리를 비운 시간

    private String certImage; // 사진인 경우 인증사진 경로에 해당

    private String emptyImage; // 자리 비움이 길어졌을때의 사진

    @CreationTimestamp
    private LocalDateTime initDate; // 인증 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

}
