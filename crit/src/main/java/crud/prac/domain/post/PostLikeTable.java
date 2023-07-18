package crud.prac.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import crud.prac.domain.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/*
 * * 230718
 * * 게시글 좋아요 연관 테이블
 * * by 조경호
 */
@Entity
@NoArgsConstructor
@Getter
@Setter
public class PostLikeTable {

    @Id
    @GeneratedValue
    @Column(name = "like_id")
    private Long id;

    private LocalDateTime initDate; // 좋아요 누른 날짜

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
}
