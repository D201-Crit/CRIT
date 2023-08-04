package com.ssafy.crit.boards.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.Classification;
import com.ssafy.crit.boards.entity.feeds.UploadFile;
import com.ssafy.crit.boards.repository.UploadFileRepository;
import com.ssafy.crit.boards.repository.ClassificationRepository;
import com.ssafy.crit.boards.service.dto.BoardDto;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.repository.BoardRepository;

import com.ssafy.crit.boards.service.dto.BoardSaveRequestDto;
import com.ssafy.crit.boards.service.dto.BoardShowSortDto;
import com.ssafy.crit.common.s3.S3Uploader;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

	private final BoardRepository boardRepository;
	private final UserRepository userRepository;
	private final ClassificationRepository classificationRepository;
	private final S3Uploader s3Uploader;
	private final UploadFileRepository uploadFileRepository;

	//전체 게시물
	@Transactional(readOnly = true)
	public Page<BoardShowSortDto> getBoards(Pageable pageable, String category) {
		classificationRepository.findByCategory(category).orElseThrow(
			() -> {
				return new IllegalArgumentException("찾으시는 " + category + "가 없습니다.");
			});

		Page<Board> boards = boardRepository.findAllByClassificationCategory(pageable, category);
		return getBoardShowSortDtos(boards);
	}
	@Transactional(readOnly = true)
	public Page<BoardShowSortDto> getWholeBoards(Pageable pageable) {
		Page<Board> boards = boardRepository.findAll(pageable);
		return getBoardShowSortDtos(boards);
	}

	//개별 게시물 조회
	@Transactional
	public BoardDto getBoard(Long id) {
		Board board = boardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("Board Id를 찾을 수 없습니다.");
		});

		board.setViews(board.getViews() + 1);
		boardRepository.save(board);

		return BoardDto.toDto(board);
	}

	public BoardSaveRequestDto write(List<MultipartFile> multipartFiles , BoardSaveRequestDto boardSaveRequestDto, User user) throws
		IOException {

		Classification classification = classificationRepository.findByCategory(boardSaveRequestDto.getClassification())
			.orElseGet(() -> {
				// Create and save a new Classification.
				Classification newClassification = new Classification();
				// Ensure that you're setting the Category here.
				newClassification.setCategory(boardSaveRequestDto.getClassification());
				classificationRepository.save(newClassification);
				return newClassification;
			});

		List<String> storeFileResult = new ArrayList<>();
		Board board = Board.builder()
			.title(boardSaveRequestDto.getTitle())
			.content(boardSaveRequestDto.getContent())
			.classification(classification)
			.user(user)
			.build();

		boardRepository.save(board);

		for (MultipartFile multipartFile : multipartFiles) {
			if (!multipartFile.isEmpty()) {

				String uploadFiles = s3Uploader.uploadFiles(multipartFile, "Boards");

				UploadFile uploadFile = UploadFile.builder()
					.board(board)
					.userName(user.getNickname())
					.storeFilePath(uploadFiles)
					.classification(classification.getCategory())
					.build();

				uploadFileRepository.save(uploadFile);

				storeFileResult.add(uploadFiles);
			}
		}

		boardSaveRequestDto.setId(board.getId());
		boardSaveRequestDto.setImageFiles(storeFileResult);


		return boardSaveRequestDto;
	}


	public BoardDto update(Long id, BoardDto boardDto, List<MultipartFile> multipartFiles) throws IOException {
		Board board = boardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("Board Id를 찾을 수 없습니다!");
		});

		User user = board.getUser();

		List<UploadFile> uploadFile = uploadFileRepository.findAllByBoardsId(id);

		uploadFileRepository.deleteAll(uploadFile);

		// Clear and re-add the files to the existing collection.
		board.getUploadFiles().clear();

		List<String> storeFileResult = new ArrayList<>();

		for (MultipartFile multipartFile : multipartFiles) {
			if (!multipartFile.isEmpty()) {

				String uploadFiles = s3Uploader.uploadFiles(multipartFile, "Boards");

				UploadFile uploadFileSave = UploadFile.builder()
					.board(board)
					.userName(user.getId())
					.storeFilePath(uploadFiles)
					.classification(board.getClassification().getCategory())
					.build();

				uploadFileRepository.save(uploadFileSave);
				// directly add the new files to the existing collection
				board.getUploadFiles().add(uploadFileSave);
				storeFileResult.add(uploadFiles);
			}
		}

		board.setUpdate(boardDto.getTitle(),boardDto.getContent());

		boardRepository.save(board);

		return BoardDto.toDto(board);
	}

	// 게시글 삭제
	public void delete(Long id) {
		// 매개변수 id를 기반으로, 게시글이 존재하는지 먼저 찾음
		// 게시글이 없으면 오류 처리
		Board board = boardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("Board Id를 찾을 수 없습니다!");
		});
		// 게시글이 있는 경우 삭제처리
		boardRepository.deleteById(id);
	}

	public Page<BoardShowSortDto> findAllDesc(Pageable pageable) {
		Page<Board> boards = boardRepository.findAllDesc(pageable);
		return getBoardShowSortDtos(boards);
	}


	public Page<BoardShowSortDto> findAllAsc(Pageable pageable) {
		Page<Board> boards = boardRepository.findAllAsc(pageable);
		return getBoardShowSortDtos(boards);
	}



	public Page<BoardShowSortDto> orderByViewsDesc(Pageable pageable) {
		Page<Board> boards = boardRepository.orderByViewsDesc(pageable);
		return getBoardShowSortDtos(boards);
	}

	public Page<BoardShowSortDto> orderByViewsAsc(Pageable pageable) {
		Page<Board> boards = boardRepository.orderByViewsAsc(pageable);
		return getBoardShowSortDtos(boards);
	}


	public Page<BoardShowSortDto> findByTitleContaining(@RequestParam String find, Pageable pageable) {
		Page<Board> boards = boardRepository.findByTitleContaining(find, pageable);
		return getBoardShowSortDtos(boards);
	}

	private Page<BoardShowSortDto> getBoardShowSortDtos(Page<Board> boards) {
		return boards.map(board -> {
			if (board.getUser() == null) {
				throw new RuntimeException("User is null for board id: " + board.getId());
			}

			List<String> likedName = board.getLikes().stream()
				.map(like -> like.getUser().getNickname()) // change getName() to your method
				.collect(Collectors.toList());

			return new BoardShowSortDto(board.getId(),
					board.getTitle(),
					board.getContent(),
					board.getViews(),
					board.getUser().getNickname(),
					board.getLikes().size(),
				board.getClassification().getCategory(),
				likedName);
		});
	}
}
