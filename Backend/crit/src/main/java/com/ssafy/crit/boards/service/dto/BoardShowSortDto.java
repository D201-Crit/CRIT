package com.ssafy.crit.boards.service.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardShowSortDto {
    private Long id;
    private String title;
    private String content;
    private int views;
    private String writer;
    private int likesCount;

    @Builder
    public BoardShowSortDto(Long id, String title, String content, int views, String writer, int likesCount) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.views = views;
        this.writer = writer;
        this.likesCount = likesCount;
    }
}
