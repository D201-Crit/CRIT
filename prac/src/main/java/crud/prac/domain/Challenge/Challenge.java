package crud.prac.domain.challenge;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import crud.prac.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

	private Cert cert;

	private Boolean isOffline;

	private int people;

	private int money;

	@OneToMany(mappedBy = "challenge")
	private List<IsCert> isCerts;

	@OneToMany(mappedBy = "challenge")
	private List<ChallengeCategory> challengeCategories;
}
