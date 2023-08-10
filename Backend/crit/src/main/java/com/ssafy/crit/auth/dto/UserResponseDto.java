package com.ssafy.crit.auth.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.crit.auth.entity.User;

import lombok.*;

@Getter
@NoArgsConstructor
public class UserResponseDto {
    // pk 값을 id로 받음. 유저 로그인 id를 고유값으로 만들기 위함.
    private String id;

    // 유저 닉네임
    private String nickname;

    // 팔로워 리스트
    private List<String> followers = new ArrayList<>();

    // 팔로잉 리스트
    private List<String> followings = new ArrayList<>();

    // 진행하는 서비스에 유저의 경험치를 더함.
    private int exp;

    // exp로 유저의 등급을 결정
    private String grade;

    // 진행하는 서비스에 point 정책을 위함.
    private int cashPoint;

    // 생성자
    @Builder
    public UserResponseDto(String id, String nickname, List<String> followers, List<String> followings, int exp, String grade, int cashPoint) {
        this.id = id;
        this.nickname = nickname;
        this.followers = followers;
        this.followings = followings;
        this.exp = exp;
        this.grade = grade;
        this.cashPoint = cashPoint;
    }

    // user 인스턴스를 UserResponseDto로 변환시키는 로직
    @Builder
    public static UserResponseDto toUserResponseDto(User user) {

        // lambda를 통해 List
        List<String> followerNames = user.getFollowers().stream()
                .map(follow -> follow.getFollowing().getNickname())
                .collect(Collectors.toList());

        List<String> followingNames = user.getFollowings().stream()
                .map(follow -> follow.getFollower().getNickname())
                .collect(Collectors.toList());

        return new UserResponseDto(
                user.getId(),
                user.getNickname(),
                followerNames,
                followingNames,
                user.getExp(),
                user.getGrade().getTitle(),
                user.getCashPoint()
        );
    }
}
