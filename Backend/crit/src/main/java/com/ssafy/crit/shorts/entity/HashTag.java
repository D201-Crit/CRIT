package com.ssafy.crit.shorts.entity;

import javax.persistence.*;

import lombok.Data;
import org.hibernate.annotations.NaturalId;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class HashTag {

    @Id
    @GeneratedValue
    @Column(name = "hashtag_id")
    private Long id;

    private String hashTag;


//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "shorts_id")
//	private Shorts shorts;
}
