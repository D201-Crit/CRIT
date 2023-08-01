package com.ssafy.crit.boards.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.board.Comment;
import com.ssafy.crit.boards.repository.BoardRepository;
import com.ssafy.crit.boards.repository.CommentRepository;
import com.ssafy.crit.boards.service.dto.CommentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    // 댓글 작성하기
    @Transactional
    public CommentDto writeComment(Long boardId, CommentDto commentDto, User user) {
        Comment comment = new Comment();
        comment.setContent(commentDto.getContent());

        // 게시판 번호로 게시글 찾기
        Board board = boardRepository.findById(boardId).orElseThrow(() -> {
             return new IllegalArgumentException("게시판을 찾을 수 없습니다.");
        });

        comment.setUser(user);
        comment.setBoard(board);
        commentRepository.save(comment);

        return CommentDto.toDto(comment);
    }



    // 글에 해당하는 전체 댓글 불러오기
    @Transactional(readOnly = true)
    public List<CommentDto> getComments(Long boardId) {
        List<Comment> comments = commentRepository.findAllByBoardId(boardId);
        List<CommentDto> commentDtos = new ArrayList<>();

        comments.forEach(s -> commentDtos.add(CommentDto.toDto(s)));
        return commentDtos;
    }


    // 댓글 삭제하기
    @Transactional
    public String deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(()-> {
            return new IllegalArgumentException("댓글 Id를 찾을 수 없습니다.");
        });
        commentRepository.deleteById(commentId);
        return "삭제 완료";
    }
}
