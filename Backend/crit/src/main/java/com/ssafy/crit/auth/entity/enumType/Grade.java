package com.ssafy.crit.auth.entity.enumType;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Grade {
	Beginner(0, "초보자"),
	IntermediateLow(10, "하급 챌린저"),
	IntermediateMiddle(300,"중급 챌린저"),
	IntermediateHigh(500, "상급 챌린저"),
	Challenger(1000, "그랜드 챌린저"),
	Administrator(Integer.MAX_VALUE, "관리자");

	private final int key;
	private final String title;

	public static Grade getGradeByExp(int exp) {
		Grade[] grades = Grade.values();
		Grade result = Grade.Beginner;

		for (Grade grade : grades) {
			if (exp >= grade.getKey()) {
				result = grade;
			} else {
				break;
			}
		}
		return result;
	}


}
