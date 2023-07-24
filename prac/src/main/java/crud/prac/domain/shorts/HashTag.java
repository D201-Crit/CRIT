package crud.prac.domain.shorts;

import javax.persistence.*;

import org.hibernate.annotations.NaturalId;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HashTag {

	@Id
	@GeneratedValue
	@Column(name = "hashtag_id")
	private Long id;

	private String hashTag;

	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "shorts_id")
//	private Shorts shorts;
}
