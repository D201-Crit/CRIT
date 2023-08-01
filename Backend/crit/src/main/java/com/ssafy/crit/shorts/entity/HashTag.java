package com.ssafy.crit.shorts.entity;

import javax.persistence.*;

import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class HashTag {

    @Id
    @GeneratedValue
    @Column(name = "hashtag_id")
    private Long id;

    private String hashTag;

    @Builder
    public HashTag(Long id, String hashTag) {
        this.id = id;
        this.hashTag = hashTag;
    }
}
