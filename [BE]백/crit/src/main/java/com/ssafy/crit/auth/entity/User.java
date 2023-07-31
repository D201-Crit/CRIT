package com.ssafy.crit.auth.entity;

import com.ssafy.crit.auth.entity.enumType.AuthProvider;
import com.ssafy.crit.auth.entity.enumType.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.util.Date;

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

    @Builder
    public User(String id, String nickname, String password, String email, String profileImageUrl, Role role, AuthProvider authProvider, String refreshToken, Date tokenExpirationTime, String tid){
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
}
