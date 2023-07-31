package com.ssafy.crit.auth.dto;

import java.io.Serializable;

public class FollowRequestDto implements Serializable {
    private String followerId;
    private String followingId;

    public FollowRequestDto() {
    }

    public String getFollowerId() {
        return followerId;
    }

    public void setFollowerId(String followerId) {
        this.followerId = followerId;
    }

    public String getFollowingId() {
        return followingId;
    }

    public void setFollowingId(String followingId) {
        this.followingId = followingId;
    }
}
