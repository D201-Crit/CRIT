package com.ssafy.crit.shorts.dto;

import com.ssafy.crit.shorts.entity.ShortsComment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ShortsCommentDto {
    private Long id;
    private String content;
    private String writer;

    @Builder
    public ShortsCommentDto(Long id, String content, String writer) {
        this.id = id;
        this.content = content;
        this.writer = writer;
    }

    public static ShortsCommentDto toDto(ShortsComment shortsComment) {
        return ShortsCommentDto.builder()
                .id(shortsComment.getId())
                .content(shortsComment.getContent())
                .writer(shortsComment.getUser().getNickname())
                .build();
    }
}
