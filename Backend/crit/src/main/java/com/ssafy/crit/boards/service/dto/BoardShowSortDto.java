package com.ssafy.crit.boards.service.dto;


import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.feeds.UploadFile;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
/**
 * author : 강민승
 */
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
    private List<String> liked;
    private List<String> imageUrl;

    @Builder
    public BoardShowSortDto(Long id, String title, String content, int views, String writer, int likesCount,
        String classification, List<String> liked, List<String> imageUrl) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.views = views;
        this.writer = writer;
        this.likesCount = likesCount;
        this.classification = classification;
        this.liked = liked;
        this.imageUrl = imageUrl;
    }

}
