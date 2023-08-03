package com.ssafy.crit.challenge.entity;

import com.ssafy.crit.auth.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeUser {
    @Id
    @GeneratedValue
    @Column(name = "challenge_user_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // 유저

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    public ChallengeUser(User user, Challenge challenge) {
        this.user = user;
        this.challenge = challenge;
    }

    /***/
    public static ChallengeUser createChallengeUser(Challenge challenge, User user){
        ChallengeUser challengeUser = new ChallengeUser();
        challengeUser.setChallenge(challenge);
        challengeUser.setUser(user);

        return challengeUser;

    }
}
