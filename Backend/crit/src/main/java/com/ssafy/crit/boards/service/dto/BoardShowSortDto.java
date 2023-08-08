package com.ssafy.crit.boards.service.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
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
    private List<Long> fileId;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;

    @Builder
    public BoardShowSortDto(Long id, String title, String content, int views, String writer, int likesCount,
        String classification, List<String> liked, List<String> imageUrl, List<Long> fileId, LocalDateTime createTime,
        LocalDateTime modifyTime) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.views = views;
        this.writer = writer;
        this.likesCount = likesCount;
        this.classification = classification;
        this.liked = liked;
        this.imageUrl = imageUrl;
        this.fileId = fileId;
        this.createTime = createTime;
        this.modifyTime = modifyTime;
    }
}
