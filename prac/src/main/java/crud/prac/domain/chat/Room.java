package crud.prac.domain.chat;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import crud.prac.domain.BaseTimeEntity;
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

	private String name;

	// @ManyToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name = "user_id")
	// private User user;

	@OneToMany(mappedBy = "room")
	private List<Chat> chat;
}
