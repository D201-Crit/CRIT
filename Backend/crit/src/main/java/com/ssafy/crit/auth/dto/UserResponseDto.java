package com.ssafy.crit.auth.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.crit.auth.entity.Follow;
import com.ssafy.crit.auth.entity.User;

import com.ssafy.crit.auth.repository.FollowRepository;
import lombok.*;
import lombok.extern.slf4j.Slf4j;


@Getter
@NoArgsConstructor
@Slf4j
public class UserResponseDto {

    // pk 값을 id로 받음. 유저 로그인 id를 고유값으로 만들기 위함.
    private String id;

    // 유저 닉네임
    private String nickname;

    // 팔로워 리스트
    private List<String> followers = new ArrayList<>();

    // 팔로잉 리스트
    private List<String> followings = new ArrayList<>();

    // 이미지 Url
    private String imageUrl;

    // 진행하는 서비스에 유저의 경험치를 더함.
    private int exp;

    // exp로 유저의 등급을 결정
    private String grade;

    // 진행하는 서비스에 point 정책을 위함.
    private int cashPoint;

    // 생성자
    @Builder
    public UserResponseDto(String id, String nickname, List<String> followers, List<String> followings, String imageUrl,
                           int exp, String grade, int cashPoint) {
        this.id = id;
        this.nickname = nickname;
        this.followers = followers;
        this.followings = followings;
        this.imageUrl = imageUrl;
        this.exp = exp;
        this.grade = grade;
        this.cashPoint = cashPoint;
    }

    // user 인스턴스를 UserResponseDto로 변환시키는 로직
    @Builder
    public static UserResponseDto toUserResponseDto(User user, List<Follow> follows) {



        // lambda를 통해 List
        List<String> followerNames = new ArrayList<>();
//        for(Follow followers: user.getFollowers()){
//            User follower = followers.getFollower();
//            if(!follower.getNickname().equals(user.getNickname())) { // 수정된 부분
//                followerNames.add(follower.getNickname());
//            }
//        }
        for (Follow follow : follows) {
            log.info("follow NickName follower ={}", follow.getFollower().getNickname());
            if(follow.getFollowing().getNickname().equals(user.getNickname())){
                followerNames.add(follow.getFollower().getNickname());
            }
        }

        List<String> followingNames = new ArrayList<>();
        for (Follow follow : follows) {
            log.info("follow NickName ={}", follow.getFollowing().getNickname());
            if(follow.getFollower().getNickname().equals(user.getNickname())){
                followingNames.add(follow.getFollowing().getNickname());
            }
        }

        return new UserResponseDto(
                user.getId(),
                user.getNickname(),
                followerNames,
                followingNames,
                user.getProfileImageUrl(),
                user.getExp(),
                user.getGrade().getTitle(),
                user.getCashPoint()
        );
    }
}
