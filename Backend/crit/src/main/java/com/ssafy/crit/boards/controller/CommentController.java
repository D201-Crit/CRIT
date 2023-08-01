package com.ssafy.crit.boards.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.board.Comment;
import com.ssafy.crit.boards.repository.CommentRepository;
import com.ssafy.crit.boards.service.dto.CommentDto;
import com.ssafy.crit.message.response.Response;
import com.ssafy.crit.boards.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/boards/comments")
public class CommentController {

    private final CommentService commentService;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    // 댓글 작성
    @PostMapping("/{boardId}")
    public Response<?> writeComment(@PathVariable("boardId") Long boardId, @RequestBody CommentDto commentDto,
                                    HttpServletRequest httpServletRequest) {
        // 원래 로그인을 하면, User 정보는 세션을 통해서 구하고 주면 되지만,
        // 지금은 핵심 개념을 알기 위해서, JWT 로그인은 생략하고, 임의로 findById 로 유저 정보를 넣어줬습니다.
        // 추후에 로그인 기능을 도입하고 유저 정보는 세션을 통해서 넣어주면 됩니다.
        User user = getUser(httpServletRequest);

        return new Response<>("성공", "댓글 작성을 완료했습니다.", commentService.writeComment(boardId, commentDto, user));
    }


    // 게시글에 달린 댓글 모두 불러오기
    @GetMapping("/{boardId}")
    public Response<?> getComments(@PathVariable("boardId") Long boardId) {
        return new Response<>("성공", "댓글을 불러왔습니다.", commentService.getComments(boardId));
    }


    // 댓글 삭제
    @DeleteMapping("/{boardId}/{commentId}")
    public Response<?> deleteComment(@PathVariable("boardId") Long boardId, @PathVariable("commentId") Long commentId,
                                     HttpServletRequest httpServletRequest) {
        // 추후 JWT 로그인 기능을 추가하고나서, 세션에 로그인된 유저와 댓글 작성자를 비교해서, 맞으면 삭제 진행하고
        // 틀리다면 예외처리를 해주면 된다.
        User user = getUser(httpServletRequest);
        Comment comment = commentRepository.findById(commentId).get();
        if(user.getId().equals(comment.getUser().getId())){
            return new Response<>("성공", "댓글 삭제 완료", commentService.deleteComment(commentId));
        } else {
            return new Response<>("실패", "댓글 삭제 실패", null);
        }
    }

    private User getUser(HttpServletRequest httpServletRequest) {
        String header = httpServletRequest.getHeader("Authorization");
        String bearer = header.substring(7);
        String userId = (String) jwtProvider.get(bearer).get("userId");

        User user = userRepository.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("유저 ID를 찾을수 없습니다.");
        });
        return user;
    }

}
