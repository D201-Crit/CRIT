package com.ssafy.crit.imsimember.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.crit.imsimember.entity.Follow;
import com.ssafy.crit.imsimember.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private String membername;

    private String password;

    private String name;

    private List<String> followers = new ArrayList<>();

    private List<String> followings = new ArrayList<>();

    static MemberResponseDto toMemberResponseDto(Member member) {
        List<String> followerNames = member.getFollowers().stream()
                .map(follow -> follow.getFollowing().getName())
                .collect(Collectors.toList());

        List<String> followingNames = member.getFollowings().stream()
                .map(follow -> follow.getFollower().getName())
                .collect(Collectors.toList());

        return new MemberResponseDto(
                member.getMembername(),
                member.getPassword(),
                member.getName(),
                followerNames,
                followingNames
        );
    }
}
