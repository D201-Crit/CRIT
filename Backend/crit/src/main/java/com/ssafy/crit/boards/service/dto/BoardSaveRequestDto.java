package com.ssafy.crit.boards.service.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.feeds.UploadFile;

import lombok.*;

@Getter
@NoArgsConstructor
public class BoardSaveRequestDto {
    private Long id;
    private String title;
    private String content;
    private String classification;
    private String writer;
    private List<String> imageFiles;

    @Builder
    public BoardSaveRequestDto(Long id, String title, String content, String classification, String writer,
        List<String> imageFiles) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.classification = classification;
        this.writer = writer;
        this.imageFiles = imageFiles;
    }

    @Builder
    public static BoardSaveRequestDto toSaveRequestDto(Board board) {

        List<String> filenames = board.getUploadFiles().stream()
            .map(UploadFile::getStoreFilePath)
            .collect(Collectors.toList());

        return new BoardSaveRequestDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getClassification().getCategory(),
                board.getUser().getId(),
                filenames);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setImageFiles(List<String> storeFileResult) {
        this.imageFiles  = storeFileResult;
    }
}
