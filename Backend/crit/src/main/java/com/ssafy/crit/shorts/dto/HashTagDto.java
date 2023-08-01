package com.ssafy.crit.shorts.dto;

import com.ssafy.crit.shorts.entity.HashTag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @NoArgsConstructor
public class HashTagDto {
    private String hashTag;

    @Builder
    public HashTagDto(String hashTag) {
        this.hashTag = hashTag;
    }

    public HashTag toEntity() {
        return HashTag.builder()
                .hashTag(hashTag)
                .build();
    }
}
