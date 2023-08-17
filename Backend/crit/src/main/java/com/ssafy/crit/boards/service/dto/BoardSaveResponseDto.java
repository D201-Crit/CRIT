package com.ssafy.crit.boards.service.dto;

import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.feeds.UploadFile;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    private String createTime;
    private String modifyTime;
    private List<String> imageFiles;
    private List<Long>  fileId;

    @Builder
    public BoardSaveResponseDto(Long id, String title, String content, String writer, String classification, String createTime, String modifyTime, List<String> imageFiles, List<Long> fileId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.classification = classification;
        this.createTime = createTime;
        this.modifyTime = modifyTime;
        this.imageFiles = imageFiles;
        this.fileId = fileId;
    }

    @Builder
    public static BoardSaveResponseDto toSaveResponseDto(Board board) {

        List<String> filenames = board.getUploadFiles().stream()
            .map(UploadFile::getStoreFilePath)
            .collect(Collectors.toList());

        List<Long> fileId = board.getUploadFiles().stream()
            .map(UploadFile::getId)
            .collect(Collectors.toList());


        return new BoardSaveResponseDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getClassification().getCategory(),
                board.getUser().getNickname(),
                board.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss")),
                board.getModifiedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss")),
                filenames,
                fileId);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setImageFiles(List<String> storeFileResult) {
        this.imageFiles  = storeFileResult;
    }
}
