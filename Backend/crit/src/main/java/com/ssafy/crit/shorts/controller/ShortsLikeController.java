package com.ssafy.crit.shorts.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.message.response.Response;
import com.ssafy.crit.shorts.entity.Shorts;
import com.ssafy.crit.shorts.repository.ShortsRepository;
import com.ssafy.crit.shorts.service.ShortsLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shorts")
public class ShortsLikeController {
    private final ShortsLikeService shortsLikeService;
    private final ShortsRepository shortsRepository;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @PostMapping("/likes/{shortsId}")
    public Response<?> like(HttpServletRequest httpServletRequest, @PathVariable Long shortsId) {

        User user = getUser(httpServletRequest);
        Shorts shorts = shortsRepository.findById(shortsId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 쇼츠룰 찾을 수 없습니다."));
        return new Response<>("성공", "좋아요 성공 완료", shortsLikeService.like(user, shorts));
    }

    @DeleteMapping("/likes/{shortsId}")
    public Response<?> unlike(HttpServletRequest httpServletRequest, @PathVariable Long shortsId) {

        User user = getUser(httpServletRequest);
        Shorts shorts = shortsRepository.findById(shortsId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 쇼츠 X"));
        return new Response<>("성공", "좋아요 삭제 완료", shortsLikeService.unlike(user, shorts));
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
