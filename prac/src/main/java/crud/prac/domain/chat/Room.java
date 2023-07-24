package crud.prac.domain.chat;

import java.util.List;

import javax.persistence.*;

import crud.prac.domain.BaseTimeEntity;
import crud.prac.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
