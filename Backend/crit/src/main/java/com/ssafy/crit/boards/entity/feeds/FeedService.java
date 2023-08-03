package com.ssafy.crit.boards.entity.feeds;


import org.springframework.beans.factory.annotation.Value;
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

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.Classification;
import com.ssafy.crit.boards.repository.ClassificationRepository;
import com.ssafy.crit.common.s3.S3Uploader;
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
	private final BoardRepository boardRepository;
	private final ClassificationRepository classificationRepository;
	private final S3Uploader s3Uploader;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	public FileResponseDto storeFiles(FileResponseDto fileResponseDto, List<MultipartFile> multipartFiles, User user) throws IOException {

		Classification classification = classificationRepository.findByCategory(fileResponseDto.getClassification())
				.orElseGet(() -> {
					// Create and save a new Classification.
					Classification newClassification = new Classification();
					// Ensure that you're setting the Category here.
					newClassification.setCategory(fileResponseDto.getClassification());
					classificationRepository.save(newClassification);
					return newClassification;
				});

		List<String> storeFileResult = new ArrayList<>();
		Board board = Board.builder()
				.id(fileResponseDto.getId())
				.content(fileResponseDto.getContent())
				.user(userRepository.findById(fileResponseDto.getUserName()).get())
				.classification(classification)
				.build();

		boardRepository.save(board);

		for (MultipartFile multipartFile : multipartFiles) {
			if (!multipartFile.isEmpty()) {

				String uploadFiles = s3Uploader.uploadFiles(multipartFile, "feeds");

				UploadFile uploadFile = UploadFile.builder()
					.board(board)
					.userName(user.getId())
					.storeFilePath(uploadFiles)
					.build();

				uploadFileRepository.save(uploadFile);

				storeFileResult.add(uploadFiles);
			}
		}

		fileResponseDto.setId(board.getId());
		fileResponseDto.setImageFiles(storeFileResult);
		return fileResponseDto;
	}


//	public Page<FileResponseDto> getFeeds(Pageable pageable, User user){
//		User referenceById = userRepository.getReferenceById(user.getId());
//
//		if(user.getId().equals(referenceById.getId())) {
//			Optional<Classification> feeds = classificationRepository.findByCategory("Feeds");
//			Page<Board> byClassification = boardRepository.findByClassificationAndAndUser(pageable, String.valueOf(feeds), user);
//
//			return getFileResponseDto(byClassification);
//		}
//		return null;
//	}
public Page<FileResponseDto> getFeeds(Pageable pageable, User user){
	User referenceById = userRepository.getReferenceById(user.getId());

	if(user.getId().equals(referenceById.getId())) {
		Optional<Classification> feeds = classificationRepository.findByCategory("Feeds");
		if(feeds.isPresent()) {
			Page<Board> byClassification = boardRepository.findByClassificationAndUser(pageable, feeds.get(), user);
			return getFileResponseDto(byClassification);
		} else {
			throw new RuntimeException("Classification 'Feeds' not found");
		}
	}
	return null;
}

	public FileResponseDto getFeed( Long id){
		Board board = boardRepository.findById(id).orElseThrow();
		return FileResponseDto.toDto(board);
	}

	public String delete(Long id) {
		Board board = boardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("Board Id를 찾을 수 없습니다!");
		});
		boardRepository.deleteById(id);

		return "성공";
	}

	public FileResponseDto update(Long id, FileResponseDto fileResponseDto){
		Board board = boardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("Board Id를 찾을 수 없습니다!");
		});

		User user = userRepository.findById(board.getUser().getId()).orElseThrow();

		board.setFeedUpdate(fileResponseDto.getContent());

		boardRepository.save(board);

		return FileResponseDto.toDto(board);
	}


	private Page<FileResponseDto> getFileResponseDto(Page<Board> boards) {
		return boards.map(board -> {
			if (board.getUser() == null) {
				throw new RuntimeException("User is null for board id: " + board.getId());
			}
			return new FileResponseDto(board.getId(),
				board.getContent(),
				board.getClassification().getCategory(),
				board.getUser().getId(),
				board.getUploadFiles().stream()
					.map(UploadFile::getStoreFilePath).collect(Collectors.toList()));
		});
	}
}
