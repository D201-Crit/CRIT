package com.ssafy.crit.challenge.service;

import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.challenge.repository.ChallengeCategoryRepository;
import com.ssafy.crit.challenge.repository.ChallengeRepository;
import com.ssafy.crit.challenge.repository.ChallengeUserRepository;
import com.ssafy.crit.challenge.repository.IsCertRepository;
import com.ssafy.crit.imsimember.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeUserRepository challengeUserRepository;
    private final ChallengeCategoryRepository challengeCategoryRepository;
    private final IsCertRepository isCertRepository;

    public ChallengeDto createChallenge(ChallengeDto challengeDto, Member member){
        Challenge challenge = new Challenge();
        challenge.setName(challengeDto.getName());
        challenge.setInfo(challengeDto.getInfo());
        challenge.setCert(challengeDto.getCert());
        challenge.setPeople(challengeDto.getPeople());
        challenge.setMoney(challengeDto.getMoney());

        challengeRepository.save(challenge);

        return ChallengeDto.toDto(challenge);
    }
}
