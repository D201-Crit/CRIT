package com.ssafy.crit.shorts.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.message.response.Response;
import com.ssafy.crit.shorts.dto.ShortsCommentDto;
import com.ssafy.crit.shorts.entity.ShortsComment;
import com.ssafy.crit.shorts.repository.ShortsCommentRepository;
import com.ssafy.crit.shorts.service.ShortsCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shorts/comments")
public class ShortsCommentController {

    private final ShortsCommentService shortsCommentService;
    private final ShortsCommentRepository shortsCommentRepository;
    private final JwtProvider jwtProvider;

    // 댓글 작성
    @PostMapping("/{shortsId}")
    public Response<?> writeComment(@PathVariable("shortsId") Long shortsId, @RequestBody ShortsCommentDto shortsCommentDto,
                                    HttpServletRequest httpServletRequest) {
        User user = jwtProvider.extractUser(httpServletRequest);
        return new Response<>("성공", "댓글 작성을 완료했습니다.", shortsCommentService.writeComment(shortsId, shortsCommentDto, user));
    }

    // 게시글에 달린 댓글 모두 불러오기
    @GetMapping("/{shortsId}")
    public Response<?> getComments(@PathVariable("shortsId") Long shortsId) {
        return new Response<>("성공", "댓글을 불러왔습니다.", shortsCommentService.getComments(shortsId));
    }

    // 댓글 삭제
    @DeleteMapping("/{shortsId}/{commentId}")
    public Response<?> deleteComment(@PathVariable("shortsId") Long shortsId, @PathVariable("commentId") Long commentId,
                                     HttpServletRequest httpServletRequest) {
        User user = jwtProvider.extractUser(httpServletRequest);
        ShortsComment shortsComment = shortsCommentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글이 없습니다."));

        if(user.getId().equals(shortsComment.getUser().getId())){
            return new Response<>("성공", "댓글 삭제 완료", shortsCommentService.deleteComment(commentId));
        } else {
            return new Response<>("실패", "댓글 삭제 실패", null);
        }
    }
}
