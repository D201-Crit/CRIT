package com.ssafy.crit.shorts.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.board.LikeTable;
import com.ssafy.crit.boards.service.dto.LikeDto;
import com.ssafy.crit.shorts.dto.ShortsLikeDto;
import com.ssafy.crit.shorts.entity.Shorts;
import com.ssafy.crit.shorts.entity.ShortsLikeTable;
import com.ssafy.crit.shorts.repository.ShortsLikeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ShortsLikeService {
    private final ShortsLikeRepository shortsLikeRepository;
    public ShortsLikeDto like(User user, Shorts shorts) {

        if (shortsLikeRepository.findByUserAndShorts(user, shorts).isEmpty()) {
            ShortsLikeTable like = new ShortsLikeTable();
            like.setUser(user);
            like.setShorts(shorts);
            shortsLikeRepository.saveAndFlush(like);
        }

        shorts.getLikesCount();
        return new ShortsLikeDto(shorts.getTitle(), user.getId());
    }

    public ShortsLikeDto unlike(User user, Shorts shorts) {
        shortsLikeRepository.deleteByUserAndShorts(user, shorts);
        shortsLikeRepository.flush();

        ShortsLikeDto shortsLikeDto = new ShortsLikeDto(shorts.getTitle(), user.getId());
        shorts.getLikesCount();
        return shortsLikeDto;
    }
}
