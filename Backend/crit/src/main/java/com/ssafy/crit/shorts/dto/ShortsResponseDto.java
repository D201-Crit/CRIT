package com.ssafy.crit.shorts.dto;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.shorts.entity.Shorts;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter @NoArgsConstructor
public class ShortsResponseDto {
    private String title;
    private String shortsUrl;
    private List<String> hashTagNames = new ArrayList<>();
    private String content;
    private String shortsName;
    private String thumbnailUrl;

    @Builder
    public ShortsResponseDto(String title, String shortsUrl, List<String> hashTagNames, String content, String shortsName, String thumbnailUrl) {
        this.title = title;
        this.shortsUrl = shortsUrl;
        this.hashTagNames = hashTagNames;
        this.content = content;
        this.shortsName = shortsName;
        this.thumbnailUrl = thumbnailUrl;
    }

    public Shorts toEntity(User user) {
        return Shorts.builder()
                .title(title)
                .shortsUrl(shortsUrl)
                .shortsName(shortsName)
                .content(content)
                .thumbnailUrl(thumbnailUrl)
                .user(user)
                .views(0)
                .build();
    }
}
