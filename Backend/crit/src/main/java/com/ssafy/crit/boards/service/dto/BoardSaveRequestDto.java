package com.ssafy.crit.boards.service.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.feeds.UploadFile;

import lombok.*;
/**
 * author : 강민승
 */
@Getter
@NoArgsConstructor
public class BoardSaveRequestDto {
    private Long id;
    private String title;
    private String content;
    private String classification;
    private List<String> imageFiles;

    @Builder
    public BoardSaveRequestDto(Long id, String title, String content, String classification,
        List<String> imageFiles) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.classification = classification;
        this.imageFiles = imageFiles;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
