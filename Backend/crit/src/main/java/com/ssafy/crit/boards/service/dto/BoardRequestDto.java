package com.ssafy.crit.boards.service.dto;

import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.feeds.UploadFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

/**
 * author : 강민승
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardRequestDto {
    private Long id;
    private String title;
    private String content;
    private int views;
    private String classification;
    private List<String> liked;
    private List<String> imageFiles;

    @Builder
    public static BoardRequestDto toDto(Board board) {

        List<String> filenames = board.getUploadFiles().stream()
            .map(UploadFile::getStoreFilePath)
            .collect(Collectors.toList());

        List<String> likedName = board.getLikes().stream()
            .map(like -> like.getUser().getNickname()) // change getName() to your method
            .collect(Collectors.toList());


        BoardRequestDto boardDto = new BoardRequestDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getViews(),
                board.getClassification().getCategory(),
                likedName,
            filenames);
        return boardDto;
    }

}