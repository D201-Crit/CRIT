package com.ssafy.crit.shorts.entity;

import com.ssafy.crit.imsimember.entity.Member;
import lombok.AccessLevel;
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

    // 영상 주소는 String으로 받음
    private String shortsUrl;

    private String title;

    private int views;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "name_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Member memberName;

    /**
     * 요렇게 추가하는게 어떤지?
     */
    @OneToMany(mappedBy = "shorts")
    private List<HashTagShorts> hashTagShortsList = new ArrayList<>(); // 해시태그 리스트
//	@OneToMany(mappedBy = "shorts")
//	private List<HashTag> hashTagList;

}
