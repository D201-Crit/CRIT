package com.ssafy.crit.boards.entity.feeds;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.Classification;
import com.ssafy.crit.boards.repository.ClassificationRepository;
import com.ssafy.crit.boards.service.dto.BoardShowSortDto;
import com.ssafy.crit.common.util.UploadUtil;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.repository.BoardRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FeedService {

	private final UploadFileRepository uploadFileRepository;
	private final UserRepository userRepository;
	private final UploadUtil uploadUtil;
	private final BoardRepository boardRepository;
	private final ClassificationRepository classificationRepository;

	public FileResponseDto storeFiles(FileResponseDto fileResponseDto,List<MultipartFile> multipartFiles, User user) throws IOException {
		List<String> storeFileResult = new ArrayList<>();

		for (MultipartFile multipartFile : multipartFiles) {
			if (!multipartFile.isEmpty()) {

				UploadUtil.NeedsUpload needsUpload = uploadUtil.storeFile(multipartFile);

				UploadFile uploadFile = UploadFile.builder()
					.userName(user.getId())
					.storeFilePath(needsUpload.getStorePath())
					.uploadFileName(needsUpload.getOriginalName())
					.storeFileName(needsUpload.getStoreName())
					.build();

				uploadFileRepository.save(uploadFile);

				String fullPath = uploadUtil.getFullPath(needsUpload.getStoreName());
				storeFileResult.add(fullPath);
			}
		}
		Board board = Board.builder()
			.content(fileResponseDto.getContent())
			.user(userRepository.findById(fileResponseDto.getUserName()).get())
			.build();

		boardRepository.save(board);

		fileResponseDto.setImageFiles(storeFileResult);

		return fileResponseDto;
	}

	public Page<FileResponseDto> getFeeds(Pageable pageable, User user){
		User referenceById = userRepository.getReferenceById(user.getId());

		if(user.getId().equals(referenceById.getId())) {
			Optional<Classification> feeds = classificationRepository.findByCategory("Feeds");
			Page<Board> byClassification = boardRepository.findByClassificationAndAndUser(pageable, String.valueOf(feeds), user);

			return getFileResponseDto(byClassification);
		}
		return null;
	}

	public FileResponseDto getFeed( Long id){
		Board board = boardRepository.findById(id).orElseThrow();
		return FileResponseDto.toDto(board);
	}


	private Page<FileResponseDto> getFileResponseDto(Page<Board> boards) {
		return boards.map(board -> {
			if (board.getUser() == null) {
				throw new RuntimeException("User is null for board id: " + board.getId());
			}
			return new FileResponseDto(board.getId(),
				board.getContent(),
				board.getUser().getId(),
				board.getUploadFiles().stream()
					.map(UploadFile::getUploadFileName).collect(Collectors.toList()));
		});
	}
}
