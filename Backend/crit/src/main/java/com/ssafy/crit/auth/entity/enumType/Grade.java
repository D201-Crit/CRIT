package com.ssafy.crit.auth.entity.enumType;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Grade {
	Beginner(0, "초보자"),
	IntermediateLow(10, "수습 챌린저"),
	IntermediateMiddle(300,"중견 챌린저"),
	IntermediateHigh(500, "상급 챌린저"),
	Challenger(1000, "신");

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
