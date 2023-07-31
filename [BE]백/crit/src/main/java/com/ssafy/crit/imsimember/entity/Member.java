package com.ssafy.crit.imsimember.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;

	@Column(nullable = false, unique = true)
	private String membername;

	@JsonIgnore // 패스워드는 민감정보라 JSON으로 안만들어버린다!
	@Column(nullable = false)
	private String password;

	@Column(nullable = false, unique = true)
	private String name;

	@OneToMany(mappedBy = "follower")
	private List<Follow> followers = new ArrayList<>();

	@OneToMany(mappedBy = "following")
	private List<Follow> followings = new ArrayList<>();
	public void addMemberTofollower(Follow follow) {
		followers.add(follow);
	}

	public void addMemberTofollowing(Follow follow) {
		followings.add(follow);
	}

	public void removeMemberTofollower(Follow follow) {
		followers.remove(follow);
	}

	public void removeMemberTofollowing(Follow follow) {
		followings.remove(follow);
	}

}
