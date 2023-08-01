package com.ssafy.crit.boards.entity.feeds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.crit.auth.entity.BaseTimeEntity;
import com.ssafy.crit.boards.entity.board.Board;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
public class UploadFile extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "file_id")
	private Long id;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "id")
	private Board board;

	private String uploadFileName;  // 파일 원본명

	private String storeFileName;

	private String storeFilePath;  // 파일 저장 경로

	@Builder
	public UploadFile(Long id, Board board, String uploadFileName, String storeFileName, String storeFilePath) {
		this.id = id;
		this.board = board;
		this.uploadFileName = uploadFileName;
		this.storeFileName = storeFileName;
		this.storeFilePath = storeFilePath;
	}

	public UploadFile(String uploadFileName, String storeFileName, String storeFilePath) {
		this.uploadFileName = uploadFileName;
		this.storeFileName = storeFileName;
		this.storeFilePath = storeFilePath;
	}

	public void setFeeds(Board board) {
		this.board = board;
	}
}
