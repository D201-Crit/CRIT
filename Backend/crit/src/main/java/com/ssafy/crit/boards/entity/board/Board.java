package com.ssafy.crit.boards.entity.board;

import com.ssafy.crit.auth.entity.BaseTimeEntity;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.boards.entity.Classification;

import lombok.*;

import javax.persistence.*;

import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Board extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String content;

    private int views;

    private String BoardImageUrl;

    private String BoardImageName;

    @ManyToOne
    @JoinColumn(name = "board")
    private Classification classification;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "board")
    private List<LikeTable> likes;

    @Builder
    public Board(Long id, String title, String content, int views, String boardImageUrl, String boardImageName,
        Classification classification, User user, List<LikeTable> likes) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.views = views;
        BoardImageUrl = boardImageUrl;
        BoardImageName = boardImageName;
        this.classification = classification;
        this.user = user;
        this.likes = likes;
    }

    public int getLikes(List<LikeTable> likes){
        return likes.size();
    }

    public void setViews(int views){
        this.views = views;
    }


    public void setUpdate(String title, String content) {
        this.title = title;
        this.content = content;
    }

}
