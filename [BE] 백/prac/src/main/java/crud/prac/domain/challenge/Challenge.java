package crud.prac.domain.challenge;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import crud.prac.domain.BaseTimeEntity;
import crud.prac.domain.User;
import crud.prac.domain.posts.Board;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Challenge extends BaseTimeEntity {

	@Id
	@GeneratedValue
	@Column(name = "challenge_id")
	private Long id;

	private String name;

	private String info;

	private int doingTime;

	@Enumerated(EnumType.STRING)
	private Cert cert;

	private Boolean isOffline; // 굳이 필요한가?

	private int people; // 총인원

	private int money; // 참여비

	@CreationTimestamp
	private LocalDateTime initDate; // 생성일

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id")
	private Board board; // 보드

	@OneToMany(mappedBy = "challenge")
	private List<IsCert> isCerts; // 챌린지별 인증을 모아 두는곳?

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_challenge_id")
	private ChallengeCategory challengeCategory;
	/**
	 * 챌린지 카테고리는 1대1이면 가능하지 않을까?
	 */

	@OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
	private List<ChallengeUser> challengeUserList = new ArrayList<>(); //챌린지 유저 리스트
}
