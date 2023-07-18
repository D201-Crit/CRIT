package crud.prac.domain.post;


import crud.prac.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * * 230718
 * * 게시글 엔티티
 * * by 조경호
 */


@Getter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue
    @Column(name = "post_id")
    private Long id;

    @Column(length = 30, nullable = false)
    private String title;

    @Column(nullable = false) // NOT NULL
    private String content; // 게시글 내용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member author; // 작성자

    private LocalDateTime initDate; // 게시글 생성 날짜


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;  // 해당 보드

    private int views;  // 조회수
    
    @OneToMany(mappedBy = "post")
    private List<PostComment> comments = new ArrayList<>(); // 게시글의 댓글들

    @OneToMany(mappedBy = "post")
    private List<PostLikeTable> likeTables = new ArrayList<>(); // 게시글의 좋아요


    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void plusViews() {
        this.views = this.views + 1;
    }

    public void addLikeTable(PostLikeTable likeTable) {
        likeTables.add(likeTable);
    }

    public void removeLikeTable(PostLikeTable likeTable) {
        likeTables.remove(likeTable);
    }


}
