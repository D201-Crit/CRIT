package com.ssafy.crit.boards.service;

import com.ssafy.crit.boards.entity.Board;
import com.ssafy.crit.boards.entity.Classification;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardSaveRequestDto {
    private Long id;
    private String title;
    private String content;
    private Classification classification;
    private String writer;

    @Builder
    public static BoardSaveRequestDto toSaveRequestDto(Board board) {
        BoardSaveRequestDto BoardSaveRequestDto = new BoardSaveRequestDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getClassification(),
                board.getUser().getId());

        return BoardSaveRequestDto;
    }
}
