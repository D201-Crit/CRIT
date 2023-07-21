package crud.prac.domain.shorts;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.NaturalId;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HashTag {

	@Id
	@GeneratedValue
	@Column(name = "hashtag_id")
	private Long id;

	private String hashTag;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "shorts_id")
	private Shorts shorts;
}
