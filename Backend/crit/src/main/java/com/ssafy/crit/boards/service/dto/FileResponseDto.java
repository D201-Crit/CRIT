package com.ssafy.crit.boards.service.dto;

import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.entity.feeds.UploadFile;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
/**
 * author : 강민승
 */
@Getter @Setter
@RequiredArgsConstructor
public class FileResponseDto {

	private Long id;
	private String content;
	private String classification;
	private String userName;
	private List<String> imageFiles;
	private String createTime;
	private String modifyTime;


	@Builder
	public FileResponseDto(Long id, String content, String classification, String userName, List<String> imageFiles, String createTime, String modifyTime) {
		this.id = id;
		this.content = content;
		this.classification = classification;
		this.userName = userName;
		this.imageFiles = imageFiles;
		this.createTime = createTime;
		this.modifyTime = modifyTime;
	}

	@Builder
	public static FileResponseDto toDto(Board board){
		List<String> filenames = board.getUploadFiles().stream()
			.map(UploadFile::getStoreFilePath)
			.collect(Collectors.toList());

		return new FileResponseDto(
			board.getId(),
			board.getContent(),
				board.getClassification().getCategory(),
			board.getUser().getNickname(),
			filenames,
				board.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss")),
				board.getModifiedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss"))
		);
	}



	public void setImageFiles(List<String> storeFileResult) {
		this.imageFiles = storeFileResult;
	}

	public void setUserName(String id) {
		this.userName = id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}

