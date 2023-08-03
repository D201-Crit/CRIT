package com.ssafy.crit.boards.entity.board;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.ssafy.crit.auth.entity.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class LikeTable {

	@Id
	@GeneratedValue
	private Long id;

	 @ManyToOne(fetch = FetchType.LAZY)
	 private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	private Board board;
}
