package com.ssafy.crit.shorts.entity;

import com.ssafy.crit.auth.entity.BaseTimeEntity;
import com.ssafy.crit.auth.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ShortsComment extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE) // 연관된 member가 삭제되면 같이 삭제됨
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shorts_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Shorts shorts;

    @Builder
    public ShortsComment(Long id, String content, User user, Shorts shorts) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.shorts = shorts;
    }
}
