package com.ssafy.crit.boards.entity.feeds;

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
	private List<String> imageFiles; // This is now a list of filenames

	@Builder
	public FileResponseDto(Long id, String content, String userName, List<String> imageFiles) {
		this.Id = id;
		this.content = content;
		this.userName = userName;
		this.imageFiles = imageFiles;
	}

	@Builder
	public static FileResponseDto toDto(Feeds feeds){
		// Transform the list of UploadFile objects to a list of filenames
		List<String> filenames = feeds.getImageFiles().stream()
			.map(UploadFile::getUploadFileName)
			.collect(Collectors.toList());

		FileResponseDto fileResponseDto = new FileResponseDto(
			feeds.getId(),
			feeds.getContent(),
			feeds.getUser().getId(), // Assume there is a method to get username in User class
			filenames // Pass the list of filenames instead of UploadFile objects
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

