package com.ssafy.crit.boards.entity.feeds;

import com.ssafy.crit.boards.entity.board.Board;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public class FileResponseDto {

	private Long id;
	private String content;
	private String classification;
	private String userName;
	private List<String> imageFiles;

	public FileResponseDto(Long id, String content, String classification, String userName, List<String> imageFiles) {
		this.id = id;
		this.content = content;
		this.classification = classification;
		this.userName = userName;
		this.imageFiles = imageFiles;
	}

	@Builder
	public static FileResponseDto toDto(Board board){
		List<String> filenames = board.getUploadFiles().stream()
			.map(UploadFile::getUploadFileName)
			.collect(Collectors.toList());

		return new FileResponseDto(
			board.getId(),
			board.getContent(),
				board.getClassification().getCategory(),
			board.getUser().getId(),
			filenames
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

