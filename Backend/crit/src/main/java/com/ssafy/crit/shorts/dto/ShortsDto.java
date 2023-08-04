package com.ssafy.crit.shorts.dto;

import com.ssafy.crit.shorts.entity.Shorts;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ShortsDto {
    private Long id;
    private String title;
    private String nickname;
    private int viewsCount; // 조회수
    private int likesCount; // 좋아요수
    private String content;
    private String shortsUrl;
    private String thumbnailUrl;
    private List<String> hashTagNames = new ArrayList<>();

    public static ShortsDto toDto(Shorts shorts) {
        ShortsDto shortsDto = new ShortsDto();
        shortsDto.setId(shorts.getId());
        shortsDto.setTitle(shorts.getTitle());
        shortsDto.setShortsUrl(shorts.getShortsUrl());
        shortsDto.setContent(shorts.getContent());
        shortsDto.setThumbnailUrl(shorts.getThumbnailUrl());
        shortsDto.setViewsCount(shorts.getViews());
        shortsDto.setNickname(shorts.getUser().getNickname());
        shortsDto.setLikesCount(shorts.getLikes());

        List<String> hashTagNames = shorts.getHashTags()
                .stream()
                .map(hashTagShorts -> hashTagShorts.getHashTag().getHashTag())
                .collect(Collectors.toList());
        shortsDto.setHashTagNames(hashTagNames);

        return shortsDto;
    }

}
