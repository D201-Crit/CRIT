package com.ssafy.crit.challenge.dto;

import com.ssafy.crit.challenge.entity.Cert;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.challenge.entity.ChallengeCategory;
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

    private Long id; // 챌린지 아이디
    private String name; // 챌린지 이름
    private String info; // 챌린지 정보
    private String cert; // 챌린지 인증 정보
    private String category; // 챌린지 카테고리
    private int people; // 챌린지 최대 인원
    private int curPeople; // 현재 참여중인 챌린지 인원
    private int money; // 챌린지 입장 금액
    private String startDate; // 챌린지 시작 일자
    private String endDate; // 챌린지 종료 일자
    private String startTime; // 챌린지 시작 시간
    private String endTime; // 챌린지 종료 시간
    private String createUserId; // 챌린지 만든 사람
    private String classification; // 챌린지 보드
    private String imgPath; // 챌린지 이미지 경로
    private List<String> userList; // 챌린지 참여 중인 사람 닉네임


    public ChallengeListResponseDto(Challenge challenge) {
        id = challenge.getId();
        name = challenge.getName();
        category = challenge.getChallengeCategory().getSpecies();
        info = challenge.getInfo();
        cert = challenge.getCert() == Cert.WEBRTC ? "실시간" : "사진";
        people = challenge.getPeople();
        curPeople = challenge.getChallengeUserList().size();
        money = challenge.getMoney();
        startDate = challenge.getStartDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        endDate = challenge.getEndDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        startTime = challenge.getStartTime().format(DateTimeFormatter.ofPattern("kk:mm"));
        endTime = challenge.getEndTime().format(DateTimeFormatter.ofPattern("kk:mm"));
        createUserId = challenge.getCreateUser().getId();
        classification = challenge.getBoard().getCategory();
        imgPath = challenge.getFilePath();
        userList = challenge.getChallengeUserList().stream()
                .map(challengeUser -> { return challengeUser.getUser().getNickname(); }).collect(Collectors.toList());
    }
}
