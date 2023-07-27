package com.ssafy.crit.imsimember.service;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowRequestDto {
    private String follower;
    private String following;

    public FollowRequestDto(String follower, String following) {
        this.follower = follower;
        this.following = following;
    }


}
