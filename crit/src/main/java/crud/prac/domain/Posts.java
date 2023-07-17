package crud.prac.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Builder
public class Posts {

    @Id
    @GeneratedValue
    @Column(name = "posts_id")
    private Long id;

    @Column(length = 30, nullable = false)
    private String title;

    @Column( nullable = false)
    private String content;

    private String author;

    @Enumerated(EnumType.STRING)
    private Category category;  // 카테고리

    private int views;  // 조회수


    @OneToMany(mappedBy = "posts")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "posts")
    private List<LikeTable> likeTables = new ArrayList<>();

    public Posts(String title, String content, String author, Category category, int views) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.category = category;
        this.views = views;
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
