package crud.prac.domain;

import crud.prac.domain.challenge.ChallengeUser;
import crud.prac.domain.post.PostLikeTable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * * 230718
 * * 멤버 엔티티
 * * by 조경호
 */

@Entity
@NoArgsConstructor
@Getter
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    private String name;

    private String memberId;

    private String nickname;

    private String password;

    private String profileImg;

    private int point;

    private Grade grade;

    @OneToMany(mappedBy = "member")
    private List<PostLikeTable> likeTables = new ArrayList<>();

    @OneToMany(mappedBy = "follower")
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following")
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ChallengeUser> challengeUsers = new ArrayList<>(); // 참여한 챌린지 들

    @Builder
    public Member(Long id, String name, String memberId, String nickname, String password, String profileImg, List<PostLikeTable> likeTables, List<Follow> followers, List<Follow> followings, List<ChallengeUser> challengeUsers) {
        this.id = id;
        this.name = name;
        this.memberId = memberId;
        this.nickname = nickname;
        this.password = password;
        this.profileImg = profileImg;
        this.likeTables = likeTables;
        this.followers = followers;
        this.followings = followings;
        this.challengeUsers = challengeUsers;
    }




    public void addLikeTable(PostLikeTable likeTable) {
        likeTables.add(likeTable);
    }

    public void removeLikeTable(PostLikeTable likeTable) {
        likeTables.remove(likeTable);
    }

    public void addUserToFollower(Follow follow) {
        followers.add(follow);
    }

    public void addUserToFollowing(Follow follow) {
        followings.add(follow);
    }

    public void removeUserToFollower(Follow follow) {
        followers.remove(follow);
    }

    public void removeUserToFollowing(Follow follow) {
        followings.remove(follow);
    }





}

