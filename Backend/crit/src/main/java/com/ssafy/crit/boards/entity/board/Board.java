package com.ssafy.crit.boards.entity.board;

import com.ssafy.crit.auth.entity.BaseTimeEntity;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.boards.entity.Classification;

import com.ssafy.crit.boards.entity.feeds.UploadFile;
import lombok.*;

import javax.persistence.*;

import java.util.List;

/**
 * author : 강민승
 */
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

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UploadFile> uploadFiles;
    
    @ManyToOne
    @JoinColumn(name = "board")
    private Classification classification;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LikeTable> likes;


    @Builder
    public Board(Long id, String title, String content, int views, List<UploadFile> uploadFiles, Classification classification, User user, List<LikeTable> likes) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.views = views;
        this.uploadFiles = uploadFiles;
        this.classification = classification;
        this.user = user;
        this.likes = likes;
    }

    // public int getNNumberOfLikes(List<LikeTable> likes){
    //
    //     return likes.size();
    // }

    public void setViews(int views){
        this.views = views;
    }


    public void setUpdate(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void setFeedUpdate(String content) {
        this.content = content;
    }
}
