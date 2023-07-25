package com.ssafy.crit.domain.chat;

import crud.prac.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room extends BaseTimeEntity {

	@Id
	@GeneratedValue
	@Column(name = "room_id")
	private Long id;

	private String name; // 방이름

	// @ManyToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name = "user_id")
	// private User user;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<RoomUser> users;

	@OneToMany(mappedBy = "room")
	private List<Chat> chat;
}
