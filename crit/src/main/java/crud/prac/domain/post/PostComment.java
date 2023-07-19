package crud.prac.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/*
 * * 230718
 * * 게시글 댓글
 * * by 조경호
 */

@Entity
@Getter
@NoArgsConstructor
public class PostComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER) // Eager? Lazy?
    @JoinColumn(name = "post_id")
    private Post post;

    private String content;

    private LocalDateTime init_date;

    @Builder
    public PostComment(Long id, Post posts, String content, LocalDateTime init_date) {
        this.id = id;
        this.post = posts;
        this.content = content;
        this.init_date = init_date;
    }
}
