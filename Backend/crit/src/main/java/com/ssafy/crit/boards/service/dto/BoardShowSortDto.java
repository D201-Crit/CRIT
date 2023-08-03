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
    private String classification;

    @Builder

    public BoardShowSortDto(Long id, String title, String content, int views, String writer, int likesCount,
        String classification) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.views = views;
        this.writer = writer;
        this.likesCount = likesCount;
        this.classification = classification;
    }
}
