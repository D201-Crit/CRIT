package com.ssafy.crit.boards.service.dto;

import com.ssafy.crit.boards.entity.board.Board;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardSaveRequestDto {
    private Long id;
    private String title;
    private String content;
    private String classification;
    private String writer;

    @Builder
    public static BoardSaveRequestDto toSaveRequestDto(Board board) {
        BoardSaveRequestDto BoardSaveRequestDto = new BoardSaveRequestDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getClassification().getCategory(),
                board.getUser().getId());

        return BoardSaveRequestDto;
    }
}
