package com.ssafy.crit.domain.shorts;

import crud.prac.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Shorts extends BaseTimeEntity {

	@Id
	@GeneratedValue
	@Column(name = "shorts_id")
	private Long id;

	// 영상 주소는 String으로 받음
	private String shortsUrl;

	private String title;

	private int views;


	/**
	 * 요렇게 추가하는게 어떤지?
	 */
	@OneToMany(mappedBy = "shorts")
	private List<HashTagShorts> hashTagShortsList = new ArrayList<>(); // 해시태그 리스트
//	@OneToMany(mappedBy = "shorts")
//	private List<HashTag> hashTagList;

}
