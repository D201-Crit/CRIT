package com.ssafy.crit.shorts.entity;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.imsimember.entity.Member;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
@Setter
public class Shorts {

    @Id
    @GeneratedValue
    private Long id;

    private String shortsUrl;

    private String title;

    private int views;

    private String content;

    private String shortsName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private User user;

    @OneToMany(mappedBy = "shorts", fetch = FetchType.EAGER,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HashTagShorts> hashTagShortsList = new ArrayList<>(); // 해시태그 리스트

    private String thumbnailUrl;

    @Builder
    public Shorts(Long id, String shortsUrl, String title, int views, String content, String shortsName, User user, List<HashTagShorts> hashTagShortsList, String thumbnailUrl) {
        this.id = id;
        this.shortsUrl = shortsUrl;
        this.title = title;
        this.views = views;
        this.content = content;
        this.shortsName = shortsName;
        this.user = user;
        this.hashTagShortsList = hashTagShortsList;
        this.thumbnailUrl = thumbnailUrl;
    }

    // 쿼리 메서드 추가: 해시태그 정보를 가져오는 메서드
    public List<HashTagShorts> getHashTags() {
        return this.hashTagShortsList;
    }
}
