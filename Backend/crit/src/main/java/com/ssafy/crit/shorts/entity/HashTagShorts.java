package com.ssafy.crit.shorts.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class HashTagShorts {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shorts_id")
    private Shorts shorts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hashtag_id")
    private HashTag hashTag;

    @Builder
    public HashTagShorts(Long id, Shorts shorts, HashTag hashTag) {
        this.id = id;
        this.shorts = shorts;
        this.hashTag = hashTag;
    }
}
