package com.ssafy.crit.challenge.dto;

import com.ssafy.crit.challenge.entity.Cert;
import com.ssafy.crit.challenge.entity.Challenge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
/**
 * 230729 조경호 챌린지 리스트 Dto
 */
public class ChallengeListResponseDto {

    private Long challengeId; // 챌린지 아이디
    private String challengeName; // 챌린지 이름
    private String challengeInfo; // 챌린지 정보
    private Cert challengeCert; // 챌린지 인증 정보
    private int challengePeople; // 챌린지 최대 인원
    private int challengeCurPeople; // 현재 참여중인 챌린지 인원
    private int challengeMoney; // 챌린지 입장 금액
    private String challengeStartDate; // 챌린지 시작 일자
    private String challengeEndDate; // 챌린지 종료 일자
    private String challengeStartTime; // 챌린지 시작 시간
    private String challengeEndTime; // 챌린지 종료 시간
    private String challengeCreateUserId; // 챌린지 만든 사람
    private List<String> challengeUserList; // 챌린지 참여 중인 사람


    public ChallengeListResponseDto(Challenge challenge) {
        challengeId = challenge.getId();
        challengeName = challenge.getName();
        challengeInfo = challenge.getInfo();
        challengeCert = challenge.getCert();
        challengePeople = challenge.getPeople();
        challengeCurPeople = challenge.getChallengeUserList().size();
        challengeMoney = challenge.getMoney();
        challengeStartDate = challenge.getStartDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        challengeEndDate = challenge.getEndDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        challengeStartTime = challenge.getStartTime().format(DateTimeFormatter.ofPattern("kk:mm"));
        challengeEndTime = challenge.getEndTime().format(DateTimeFormatter.ofPattern("kk:mm"));
        challengeCreateUserId = challenge.getCreateUser().getId();
        challengeUserList = challenge.getChallengeUserList().stream()
                .map(challengeUser -> { return challengeUser.getUser().getId(); }).collect(Collectors.toList());
    }
}
