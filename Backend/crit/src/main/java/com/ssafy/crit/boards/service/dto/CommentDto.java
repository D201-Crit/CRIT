package com.ssafy.crit.boards.service.dto;
import com.ssafy.crit.boards.entity.board.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * author : 강민승
 */
@Data
@NoArgsConstructor
public class CommentDto {
    private Long id;
    private String content;
    private String writer;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;

    @Builder
    public CommentDto(Long id, String content, String writer, LocalDateTime createTime, LocalDateTime modifyTime) {
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
                comment.getCreatedDate(),
                comment.getModifiedDate()
        );
    }
}
