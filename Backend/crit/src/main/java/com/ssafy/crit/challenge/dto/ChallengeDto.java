package com.ssafy.crit.challenge.dto;

import com.ssafy.crit.challenge.entity.Cert;
import com.ssafy.crit.challenge.entity.Challenge;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeDto {
    private Long id;
    private String name;
    private String info;
    private Cert cert;
    private int people; // 총인원
    private int money; // 참여비
    private List<String> participateMembers = new ArrayList<>(); // 참가 멤버 이름 리스트

    public static ChallengeDto toDto(Challenge challenge) {
        ChallengeDto challengeDto = new ChallengeDto();
        challengeDto.setId(challenge.getId());
        challengeDto.setName(challenge.getName());
        challengeDto.setInfo(challenge.getInfo());
        challengeDto.setCert(challenge.getCert());
        challengeDto.setPeople(challenge.getPeople());
        challengeDto.setMoney(challenge.getMoney());

        List<String> memberNames = challenge.getChallengeUserList().stream()
                .map(challengeUser -> challengeUser.getUser().getNickname())
                .collect(Collectors.toList());
        challengeDto.setParticipateMembers(memberNames);

        return challengeDto;
    }
}

