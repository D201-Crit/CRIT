package com.ssafy.crit.shorts.dto;

import com.ssafy.crit.shorts.entity.Shorts;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MainThumbnailDto {

    // 10개씩
    private List<ShortsDto> thumbnailsByDate;
    private List<ShortsDto> thumbnailsByView;
    private List<ShortsDto> thumbnailsByLike;

    @Builder
    public MainThumbnailDto(List<ShortsDto> thumbnailsByDate, List<ShortsDto> thumbnailsByView, List<ShortsDto> thumbnailsByLike) {
        this.thumbnailsByDate = thumbnailsByDate;
        this.thumbnailsByView = thumbnailsByView;
        this.thumbnailsByLike = thumbnailsByLike;
    }
}
