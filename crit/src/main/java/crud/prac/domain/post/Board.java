package crud.prac.domain.post;

import crud.prac.domain.Member;
import crud.prac.domain.challenge.Challenge;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


/**
 * * 230718
 * * 게시판 엔티티
 * * by 조경호
 */

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Board {
    @Id
    @GeneratedValue
    @Column(name = "board_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private BoardCategory category; // 해당 게시판의 카테고리

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>(); // 해당 보드의 게시글들 불러오기

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member admin; // 관리자 할경우

    @OneToOne(mappedBy = "board", fetch = FetchType.LAZY)
    private Challenge challenge; // 챌린지 게시판인 경우 해당 챌린지

    private LocalDateTime initDate; // 게시판 생성 일자
}
