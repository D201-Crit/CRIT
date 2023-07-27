package com.ssafy.crit.challenge.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.challenge.dto.ChallengeCreateRequestDto;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.challenge.entity.ChallengeCategory;
import com.ssafy.crit.challenge.repository.ChallengeCategoryRepository;
import com.ssafy.crit.challenge.repository.ChallengeRepository;
import com.ssafy.crit.challenge.repository.ChallengeUserRepository;
import com.ssafy.crit.challenge.repository.IsCertRepository;
import com.ssafy.crit.imsimember.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeUserRepository challengeUserRepository;
    private final ChallengeCategoryRepository challengeCategoryRepository;
    private final IsCertRepository isCertRepository;

    public int createChallenge(ChallengeCreateRequestDto challengeDto, User user) {

        ChallengeCategory category = getCategory(challengeDto);

        Challenge challenge = Challenge.builder()
                .name(challengeDto.getTitle())
                .info(challengeDto.getInfo())
                .challengeCategory(category)
                .cert(challengeDto.getCert())
                .people(challengeDto.getPeople())
                .money(challengeDto.getMoney())
                .startDate(challengeDto.getStartDate())
                .endDate(challengeDto.getEndDate())
                .doingTime(challengeDto.getDoingTime())
                .createUser(user)
                .build();

        try{
            Challenge result = challengeRepository.save(challenge);
        } catch (Exception e){
            return 0; // 생성 성공
        }
        return 1; // 생성 실패
    }


    // 카테고리 있으면 불러오기, 없으면 생성
    private ChallengeCategory getCategory(ChallengeCreateRequestDto challengeDto) {
        Optional<ChallengeCategory> challengeCategory = challengeCategoryRepository.
                findChallengeCategoryBySpecies(challengeDto.getCategory());
        ChallengeCategory category;
        if (challengeCategory.isPresent()) {
            category = ChallengeCategory.builder()
                    .species(challengeDto.getCategory())
                    .build();
            challengeCategoryRepository.save(category);
        } else {
            category = challengeCategory.get();
        }
        return category;
    }
}
