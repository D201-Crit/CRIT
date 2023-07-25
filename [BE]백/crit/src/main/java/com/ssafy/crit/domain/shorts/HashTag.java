package com.ssafy.crit.domain.shorts;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
