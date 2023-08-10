package com.ssafy.crit.auth.entity;

import com.ssafy.crit.auth.entity.enumType.AuthProvider;
import com.ssafy.crit.auth.entity.enumType.Grade;
import com.ssafy.crit.auth.entity.enumType.Role;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
public class User extends BaseTimeEntity {
    @Id
    @Column(name = "user_id")
    private String id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Column
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider authProvider;

    @Column(length = 300)
    private String refreshToken;

    private Date tokenExpirationTime;

    private String tid;

    private int exp;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    @Column
    private Boolean isChecked;

    @OneToMany(mappedBy = "follower")
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following")
    private List<Follow> followings = new ArrayList<>();

    @ColumnDefault("0")
    private int cashPoint;

    @Builder
    public User(String id, String nickname, String password, String email, String profileImageUrl,
        Role role, AuthProvider authProvider, String refreshToken, Date tokenExpirationTime, String tid, int exp,
        Grade grade, Boolean isChecked, List<Follow> followers, List<Follow> followings, int cashPoint ) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
        this.role = role;
        this.authProvider = authProvider;
        this.refreshToken = refreshToken;
        this.tokenExpirationTime = tokenExpirationTime;
        this.tid = tid;
        this.exp = exp;
        this.grade = grade;
        this.isChecked = false;
        this.followers = followers;
        this.followings = followings;
        this.cashPoint = cashPoint;
    }

    /*
    ** 엔티티 관련 비즈니스 로직
     */
    public void passwordEncode(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.password = bCryptPasswordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String refreshToken, Date refreshTokenExpirationTime) {
        this.refreshToken = refreshToken;
        this.tokenExpirationTime = refreshTokenExpirationTime;
    }

    public void expireRefreshToken(Date now) {
        this.tokenExpirationTime = now;
    }

    public User update(String name, String picture){
        this.nickname = name;
        this.profileImageUrl = picture;
        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }

    public void updateTid(String tid) {
        this.tid = tid;
    }

    public void loginExp(int exp, boolean isChecked){
        this.exp = exp + 10;
        this.isChecked = true;
    }
    public void setGrade(int exp){
        this.grade = Grade.getGradeByExp(exp);
    }

    public void setIsChecked(Boolean isChecked) {
        this.isChecked = isChecked;
    }

    public void setProfileImageUrl(String s) {
        this.profileImageUrl = s;
    }

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

    public void addCashPoint(int point) {
        this.cashPoint += point;
    }

    public boolean useCashPoint(int point){
        if(this.cashPoint < point){ // 포인트가 모자란 경우
            return false;
        }

        this.cashPoint -= point;
        return true;
    }


}
