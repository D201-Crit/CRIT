package com.ssafy.crit.shorts.entity;

import com.ssafy.crit.imsimember.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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

    private String filename;//파일이름

    private String filepath;//파일경로

    private String title;

    private int views;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "name_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Member memberName;

    @OneToMany(mappedBy = "shorts")
    private List<HashTagShorts> hashTagShortsList = new ArrayList<>(); // 해시태그 리스트

}
