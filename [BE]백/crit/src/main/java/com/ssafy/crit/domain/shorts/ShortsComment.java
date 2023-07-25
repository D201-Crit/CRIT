package com.ssafy.crit.domain.shorts;

import crud.prac.domain.BaseTimeEntity;
import crud.prac.domain.posts.Posts;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ShortsComment extends BaseTimeEntity {

	@Id
	@GeneratedValue
	@Column(name = "shorts_comment_id")
	private Long id;

	private String content;

	@ColumnDefault("FALSE")
	private Boolean isDeleted;

	// @ManyToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name = "user_id")
	// private User writer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_id")
	private ShortsComment parent;

	@OneToMany(mappedBy = "parent", orphanRemoval = true)
	private List<ShortsComment> children = new ArrayList<>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "posts_id")
	private Posts posts;


	public ShortsComment(String content) {
		this.content = content;
	}

	// public void updateWriter(User member) {
	// 	this.writer = member;
	// }

	public void updateBoard(Posts posts) {
		this.posts = posts;
	}

	public void updateParent(ShortsComment comment) {
		this.parent = comment;
	}

	public void changeIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
}
