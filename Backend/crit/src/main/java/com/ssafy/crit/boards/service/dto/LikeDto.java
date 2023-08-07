package com.ssafy.crit.boards.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 * author : 강민승
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class LikeDto {
	private String boardTitle;
	private String classification;
	private String userName;
	private int ofLike;
}

