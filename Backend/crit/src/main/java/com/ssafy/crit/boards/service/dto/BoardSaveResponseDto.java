package com.ssafy.crit.boards.service.dto;

import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.feeds.UploadFile;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

/**
 * author : 강민승
 */
@Getter
@NoArgsConstructor
public class BoardSaveResponseDto {
    private Long id;
    private String title;
    private String content;
    private String writer;
    private String classification;
    private List<String> imageFiles;

    @Builder
    public BoardSaveResponseDto(Long id, String title, String content, String classification, String writer,
                                List<String> imageFiles) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.classification = classification;
        this.imageFiles = imageFiles;
    }

    @Builder
    public static BoardSaveResponseDto toSaveResponseDto(Board board) {

        List<String> filenames = board.getUploadFiles().stream()
            .map(UploadFile::getStoreFilePath)
            .collect(Collectors.toList());

        return new BoardSaveResponseDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getClassification().getCategory(),
                board.getUser().getNickname(),
                filenames);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setImageFiles(List<String> storeFileResult) {
        this.imageFiles  = storeFileResult;
    }
}
