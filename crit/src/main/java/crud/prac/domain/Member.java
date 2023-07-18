package crud.prac.domain;

import crud.prac.domain.post.PostLikeTable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    private String name;

    private String member_id;

    private String nickname;

    private String password;

    @OneToMany(mappedBy = "member")
    private List<PostLikeTable> likeTables;

    @OneToMany(mappedBy = "follower")
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following")
    private List<Follow> followings = new ArrayList<>();

    @Builder
    public Member(Long id, String name, String member_id, String nickname, String password) {
        this.id = id;
        this.name = name;
        this.member_id = member_id;
        this.nickname = nickname;
        this.password = password;
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

