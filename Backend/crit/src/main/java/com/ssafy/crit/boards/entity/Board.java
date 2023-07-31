package com.ssafy.crit.boards.entity;

import com.ssafy.crit.auth.entity.BaseTimeEntity;
import com.ssafy.crit.auth.entity.User;
import lombok.*;

import javax.persistence.*;

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

    @Enumerated(EnumType.STRING)
    private Classification classification;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Board(Long id, String title, String content, int views, Classification classification, User user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.views = views;
        this.classification = classification;
        this.user = user;
    }

    public void setViews(int views){
        this.views = views;
    }
}
