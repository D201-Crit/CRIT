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

	private Long Id;
	private String content;
	private String userName;
	private List<String> imageFiles;

	@Builder
	public FileResponseDto(Long id, String content, String userName, List<String> imageFiles) {
		this.Id = id;
		this.content = content;
		this.userName = userName;
		this.imageFiles = imageFiles;
	}

	@Builder
	public static FileResponseDto toDto(Board feeds){
		List<String> filenames = feeds.getUploadFiles().stream()
			.map(UploadFile::getUploadFileName)
			.collect(Collectors.toList());

		FileResponseDto fileResponseDto = new FileResponseDto(
			feeds.getId(),
			feeds.getContent(),
			feeds.getUser().getId(),
			filenames
		);
		return fileResponseDto;
	}


	public void setImageFiles(List<String> storeFileResult) {
		this.imageFiles = storeFileResult;
	}

	public void setUserName(String id) {
		this.userName = id;
	}
}

