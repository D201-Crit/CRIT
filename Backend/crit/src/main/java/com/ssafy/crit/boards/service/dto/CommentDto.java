package com.ssafy.crit.boards.service.dto;
import com.ssafy.crit.boards.entity.board.Comment;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * author : 강민승
 */
@Data
@NoArgsConstructor
public class CommentDto {
    private Long id;
    private String content;
    private String writer;
    private String createTime;
    private String modifyTime;

    @Builder
    public CommentDto(Long id, String content, String writer, String createTime, String modifyTime) {
        this.id = id;
        this.content = content;
        this.writer = writer;
        this.createTime = createTime;
        this.modifyTime = modifyTime;
    }

    public static CommentDto toDto(Comment comment) {
        return new CommentDto(
                comment.getId(),
                comment.getContent(),
                comment.getUser().getNickname(),
                comment.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-hh-mm-ss")),
                comment.getModifiedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-hh-mm-ss"))
        );
    }
}
