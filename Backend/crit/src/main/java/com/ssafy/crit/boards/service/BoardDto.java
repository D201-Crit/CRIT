package com.ssafy.crit.boards.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.boards.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private Long id;
    private String title;
    private String content;
    private String writer;

    public static BoardDto toDto(Board board) {
        BoardDto boardDto = new BoardDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getUser().getId());
        return boardDto;
    }

}