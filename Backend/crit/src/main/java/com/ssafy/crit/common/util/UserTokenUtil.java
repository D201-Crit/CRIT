package com.ssafy.crit.common.util;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@Component
public class UserTokenUtil {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public User getUser(HttpServletRequest httpServletRequest) {
        String bearer = httpServletRequest.getHeader("Authorization").substring(7);
        String userId = (String) jwtProvider.get(bearer).get("userId");

        User user = userRepository.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("유저 ID를 찾을수 없습니다.");
        });
        return user;
    }
}
