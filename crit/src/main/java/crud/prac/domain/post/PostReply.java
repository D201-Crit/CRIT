package crud.prac.domain.post;

import crud.prac.domain.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

/*
 * * 230718
 * * 게시글 대댓글
 * * by 조경호
 */

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostReply {
    @Id
    @GeneratedValue
    @Column(name = "reply_id")
    private Long id; // 대댓글 pk

    private String content; // 대댓글 내용

    private LocalDateTime initDate; // 대댓글 작성 일자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private PostComment comment; // 대댓글 해당 댓글

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // 대댓글 작성자


}
