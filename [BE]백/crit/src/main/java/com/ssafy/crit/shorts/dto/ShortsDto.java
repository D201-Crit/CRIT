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
    private String shortsUrl;
    private String userId;
    private List<String> hashTagNames = new ArrayList<>();
    private String content;
    private String shortsName;

    public static ShortsDto toDto(Shorts shorts) {
        ShortsDto shortsDto = new ShortsDto();
        shortsDto.setId(shorts.getId());
        shortsDto.setTitle(shorts.getTitle());
        shortsDto.setShortsUrl(shorts.getShortsUrl());
        shortsDto.setUserId(shorts.getUser().getId());
        shortsDto.setContent(shorts.getContent());
        shortsDto.setShortsName(shorts.getShortsName());

        List<String> hashTagNames = shorts.getHashTags()
                .stream()
                .map(hashTagShorts -> hashTagShorts.getHashTag().getHashTag())
                .collect(Collectors.toList());
        shortsDto.setHashTagNames(hashTagNames);

        return shortsDto;
    }

}
