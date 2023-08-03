package com.ssafy.crit.shorts.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MainThumbnailDto {
    private List<String> thumbnailsByDate;
    private List<String> thumbnailsByView;
    private List<String> thumbnailsByLike;

    @Builder
    public MainThumbnailDto(List<String> thumbnailsByDate, List<String> thumbnailsByView, List<String> thumbnailsByLike) {
        this.thumbnailsByDate = thumbnailsByDate;
        this.thumbnailsByView = thumbnailsByView;
        this.thumbnailsByLike = thumbnailsByLike;
    }
}
