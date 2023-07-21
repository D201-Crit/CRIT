package crud.prac.domain.shorts;

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
public class Shorts extends BaseTimeEntity {

	@Id
	@GeneratedValue
	@Column(name = "shorts_id")
	private Long id;

	// 영상 주소는 String으로 받음
	private String shortsUrl;

	private String title;

	private int views;

	@OneToMany(mappedBy = "shorts")
	private List<HashTag> hashTagList;

}
