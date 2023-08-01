package com.ssafy.crit.boards.service.dto;

import com.ssafy.crit.boards.entity.board.Board;
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

    @Builder
    public static BoardDto toDto(Board board) {
        BoardDto boardDto = new BoardDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getViews(),
                board.getUser().getId());
        return boardDto;
    }

}