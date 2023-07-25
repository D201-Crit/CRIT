package com.ssafy.crit.domain.chat;

import crud.prac.domain.BaseTimeEntity;
import crud.prac.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat extends BaseTimeEntity {

	@Id
	@GeneratedValue
	@Column(name = "chat_id")
	private Long id;

	private String message;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;  // 누가 작성했는지?

	@CreationTimestamp
	private LocalDateTime initTime; // 언제 작성했는지?

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	private Room room;

}
