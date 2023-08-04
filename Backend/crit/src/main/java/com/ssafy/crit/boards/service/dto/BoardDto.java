package com.ssafy.crit.boards.service.dto;

import java.util.List;
import java.util.stream.Collectors;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.feeds.UploadFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private Long id;
    private String title;
    private String content;
    private int views;
    private String writer;
    private String classification;
    private List<String> liked;
    private List<String> imageFiles;

    @Builder
    public static BoardDto toDto(Board board) {

        List<String> filenames = board.getUploadFiles().stream()
            .map(UploadFile::getStoreFilePath)
            .collect(Collectors.toList());

        List<String> likedName = board.getLikes().stream()
            .map(like -> like.getUser().getId()) // change getName() to your method
            .collect(Collectors.toList());


        BoardDto boardDto = new BoardDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getViews(),
                board.getUser().getId(),
                board.getClassification().getCategory(),
                likedName,
            filenames);
        return boardDto;
    }

}