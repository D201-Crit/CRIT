package com.ssafy.crit.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@NoArgsConstructor
@Getter
public class FollowRequestDto implements Serializable {
    private String followingId;

    @Builder
    public FollowRequestDto(String followingId) {
        this.followingId = followingId;
    }
}
