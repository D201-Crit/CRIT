package com.ssafy.crit.auth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data

/**
 * author : 강민승
 */

public class Follow {

    // pk 값
    @Id
    @GeneratedValue
    @Column(name = "follow_id")
    private Long id;

    // 양방향 맵핑
    @JsonIgnore // 무한 참조를 방지
    @ManyToOne(fetch = FetchType.LAZY) // 성능 최적화를 위함.
    @JoinColumn(name = "follower_id")
    private User follower;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id")
    private User following;

    @Builder
    public Follow(Long id, User follower, User following) {
        this.id = id;
        this.follower = follower;
        this.following = following;
    }
}
