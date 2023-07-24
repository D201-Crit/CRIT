package crud.prac.domain;

import crud.prac.domain.challenge.ChallengeUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;
    private String nickname;
    private String password;

    @OneToMany(mappedBy = "user")
    private List<LikeTable> likeTables;

    @OneToMany(mappedBy = "follower")
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following")
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ChallengeUser> challengeUserList = new ArrayList<>(); // 유저가 참여중인 챌린지 목록



    @Builder
    public User(Long id, String nickname, String password) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
    }

    public void addLiketable(LikeTable likeTable) {
        likeTables.add(likeTable);
    }

    public void removeLiketable(LikeTable likeTable) {
        likeTables.remove(likeTable);
    }

    public void adduserTofollower(Follow follow) {
        followers.add(follow);
    }

    public void adduserTofollowing(Follow follow) {
        followings.add(follow);
    }

    public void removeuserTofollower(Follow follow) {
        followers.remove(follow);
    }

    public void removeuserTofollowing(Follow follow) {
        followings.remove(follow);
    }





}

