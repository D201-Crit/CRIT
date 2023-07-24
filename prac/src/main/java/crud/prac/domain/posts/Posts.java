package crud.prac.domain.posts;


import crud.prac.domain.LikeTable;
import crud.prac.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Posts {

    @Id
    @GeneratedValue
    @Column(name = "posts_id")
    private Long id;

    @Column(length = 30, nullable = false)
    private String title;

    @Column( nullable = false)
    private String content;

    /**
     * 유저 연결
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User author;

//    @Enumerated(EnumType.STRING)
//    private Category category;  // 카테고리

    private int views;  // 조회수

    // 생성 날짜
    @CreationTimestamp
    private LocalDateTime initDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @OneToMany(mappedBy = "posts")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "posts")
    private List<LikeTable> likeTables = new ArrayList<>();


    public Posts(Long id, String title, String content, User author, int views, LocalDateTime initDate, Board board, List<Review> reviews, List<LikeTable> likeTables) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.views = views;
        this.initDate = initDate;
        this.board = board;
        this.reviews = reviews;
        this.likeTables = likeTables;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void Plusviews() {
        this.views = this.views + 1;
    }

    public void addLiketable(LikeTable likeTable) {
        likeTables.add(likeTable);
    }

    public void removeLiketable(LikeTable likeTable) {
        likeTables.remove(likeTable);
    }


}
