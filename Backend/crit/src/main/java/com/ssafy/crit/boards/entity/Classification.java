package com.ssafy.crit.boards.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Classification {

    Challenge("챌린지 게시판", "challenge"),
    FreePost("자유게시판", "freePost"),
    DietPost("다이어트게시판", "dietPost"),
    StudyPost("공부게시판", "studyPost");

    private final String key;
    private final String value;

}
