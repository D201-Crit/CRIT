package com.ssafy.crit.boards.entity.feeds;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.crit.auth.entity.BaseTimeEntity;
import com.ssafy.crit.boards.entity.board.Board;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * author : 강민승
 */
@Getter
@Entity
@NoArgsConstructor
public class UploadFile extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "file_id")
	private Long id;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "board_id")
	private Board board;

	private String userName;

	private String classification;

	private String storeFilePath;

	@Builder
	public UploadFile(Long id, Board board, String userName, String classification, String storeFilePath) {
		this.id = id;
		this.board = board;
		this.userName = userName;
		this.classification = classification;
		this.storeFilePath = storeFilePath;
	}
}
