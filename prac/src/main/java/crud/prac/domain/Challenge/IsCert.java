package crud.prac.domain.challenge;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import crud.prac.domain.User;
import org.hibernate.annotations.ColumnDefault;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IsCert {

	@Id
	@GeneratedValue
	@Column(name = "is_cert_id")
	private Long id;

	@ColumnDefault("FALSE")
	private Boolean isCert;

	// // 인증사진
	// private Image certImg;
	//
	// // 이탈사진
	// private Image outImg;

	// 인증시간
	private int certTime;

	// 이탈시간
	private int outTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "challenge_id")
	private Challenge challenge;

	 @ManyToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "user_id")
	 private User user;


}