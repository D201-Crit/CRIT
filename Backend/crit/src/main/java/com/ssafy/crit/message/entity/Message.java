package com.ssafy.crit.message.entity;

import com.ssafy.crit.auth.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

/**
 * @OnDelete(action = OnDeleteAction.NO_ACTIOIN) 은 sender 혹은 receiver가 계정을 삭제하면 같이 지우기 위함.
 * 메서드들은 편지 삭제와 관련된 메서드,
 * -> isDelete에서 양쪽 다 true라면 db에서 삭제함.
 */

@Data
@NoArgsConstructor
@Entity
public class Message {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String content;

	@Column(nullable = false)
	private boolean deletedBySender;

	@Column(nullable = false)
	private boolean deletedByReceiver;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sender_id")
	@OnDelete(action = OnDeleteAction.NO_ACTION)
	private User sender;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "receiver_id")
	@OnDelete(action = OnDeleteAction.NO_ACTION)
	private User receiver;


	@Builder
	public Message(Long id, String title, String content, boolean deletedBySender, boolean deletedByReceiver, User sender, User receiver) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.deletedBySender = deletedBySender;
		this.deletedByReceiver = deletedByReceiver;
		this.sender = sender;
		this.receiver = receiver;
	}

	public void deleteBySender() {
		this.deletedBySender = true;
	}

	public void deleteByReceiver() {
		this.deletedByReceiver = true;
	}

	public boolean isDeleted() {
		return isDeletedBySender() && isDeletedByReceiver();
	}
}
