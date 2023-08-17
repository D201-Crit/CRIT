package com.ssafy.crit.shorts.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;
import com.ssafy.crit.shorts.dto.ShortsCommentDto;
import com.ssafy.crit.shorts.entity.Shorts;
import com.ssafy.crit.shorts.entity.ShortsComment;
import com.ssafy.crit.shorts.repository.ShortsCommentRepository;
import com.ssafy.crit.shorts.repository.ShortsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ShortsCommentService {
    private final ShortsCommentRepository shortsCommentRepository;
    private final ShortsRepository shortsRepository;

    /**
     * 쇼츠 댓글 생성
     */
    public ShortsCommentDto writeComment(Long shortsId, ShortsCommentDto ShortsCommentDto, User user) {
        Shorts shorts = shortsRepository.findById(shortsId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.NOT_EXISTS_SHORTS_ID));

        ShortsComment shortsComment = ShortsComment.builder()
                .content(ShortsCommentDto.getContent())
                .user(user)
                .shorts(shorts)
                .build();

        shortsCommentRepository.save(shortsComment);
        return ShortsCommentDto.toDto(shortsComment);
    }

    /**
     * 전체 쇼츠 댓글 조회
     */
    @Transactional(readOnly = true)
    public List<ShortsCommentDto> getComments(Long shortsId) {
        List<ShortsComment> shortsComments = shortsCommentRepository.findAllByShortsId(shortsId);
        List<ShortsCommentDto> shortsCommentDtos = new ArrayList<>();

        shortsComments.forEach(s -> shortsCommentDtos.add(ShortsCommentDto.toDto(s)));
        return shortsCommentDtos;
    }

    /**
    * 쇼츠 댓글 삭제
     */
    public String deleteComment(Long commentId) {
        shortsCommentRepository.deleteById(commentId);
        return "삭제 완료";
    }
}
