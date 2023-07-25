package com.ssafy.crit.shorts.dto;

import com.ssafy.crit.shorts.entity.Shorts;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ShortsDto {
    private String title;
    private String shortsUrl;
    private String name;
    private List<String> hashTagNames;

    public static ShortsDto toDto(Shorts shorts) {
        List<String> hashTagNames = shorts.getHashTagShortsList().stream()
                .map(hashTagShorts -> hashTagShorts.getHashTag().getHashTag())
                .collect(Collectors.toList());

        return new ShortsDto(
                shorts.getTitle(),
                shorts.getShortsUrl(),
                shorts.getMemberName().getName(),
                hashTagNames
        );
    }
}
