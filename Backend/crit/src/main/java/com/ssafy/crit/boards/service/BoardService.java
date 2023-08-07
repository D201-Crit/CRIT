package com.ssafy.crit.boards.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.Classification;
import com.ssafy.crit.boards.entity.feeds.UploadFile;
import com.ssafy.crit.boards.repository.UploadFileRepository;
import com.ssafy.crit.boards.repository.ClassificationRepository;
import com.ssafy.crit.boards.service.dto.BoardResponseDto;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.repository.BoardRepository;

import com.ssafy.crit.boards.service.dto.BoardSaveRequestDto;
import com.ssafy.crit.boards.service.dto.BoardSaveResponseDto;
import com.ssafy.crit.boards.service.dto.BoardShowSortDto;
import com.ssafy.crit.common.exception.BadRequestException;
import com.ssafy.crit.common.global.BannedWords;
import com.ssafy.crit.common.s3.S3Uploader;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * author : 강민승
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BoardService {

	private final BoardRepository boardRepository;
	private final UserRepository userRepository;
	private final ClassificationRepository classificationRepository;
	private final S3Uploader s3Uploader;
	private final UploadFileRepository uploadFileRepository;
	private final BannedWords bannedWords;


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
	public BoardResponseDto getBoard(Long id) {
		Board board = boardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("Board Id를 찾을 수 없습니다.");
		});

		board.setViews(board.getViews() + 1);
		boardRepository.save(board);

		return BoardResponseDto.toDto(board);
	}

	public BoardSaveResponseDto write(List<MultipartFile> multipartFiles , BoardSaveRequestDto boardSaveRequestDto, User user) throws
		IOException {

		/**
		 * 테스트 시 분류명이 없어도 새롭게 만들어주는 로직
		 */
		Classification classification = classificationRepository.findByCategory(boardSaveRequestDto.getClassification())
			.orElseGet(() -> {
				Classification newClassification = new Classification();
				newClassification.setCategory(boardSaveRequestDto.getClassification());
				classificationRepository.save(newClassification);
				return newClassification;
			});

		List<String> bannedWordList = Arrays.asList(bannedWords.getStt());
		if (bannedWordList.stream().allMatch(word -> boardSaveRequestDto.getTitle().contains(word))) {
			throw new BadRequestException("이모티콘 혹은 욕설이 포함된 언어로 만들 수 없습니다.");
		}


		Board board = Board.builder()
			.title(boardSaveRequestDto.getTitle())
			.content(boardSaveRequestDto.getContent())
			.classification(classification)
			.user(user)
			.build();

		boardRepository.save(board);

		List<String> storeFileResult = new ArrayList<>();

		if (multipartFiles != null) {
			for (MultipartFile multipartFile : multipartFiles) {
				String uploadFiles = s3Uploader.uploadFiles(multipartFile, "Boards");

					UploadFile uploadFile = UploadFile.builder()
						.board(board)
						.userName(user.getId())
						.storeFilePath(uploadFiles)
						.classification(classification.getCategory())
						.build();

					uploadFileRepository.save(uploadFile);

					storeFileResult.add(uploadFiles);
				}
			}
		
		return BoardSaveResponseDto.builder()
			.id(board.getId())
			.title(boardSaveRequestDto.getTitle())
			.content(boardSaveRequestDto.getContent())
			.writer(user.getNickname())
			.classification(classification.getCategory())
			.imageFiles(storeFileResult)
			.build();
	}



	public BoardResponseDto update(Long id, BoardResponseDto boardDto, List<MultipartFile> multipartFiles, User user) throws IOException {
		Board board = boardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("Board Id를 찾을 수 없습니다!");
		});

		if(!board.getUser().getId().equals(user.getId())){
			throw new IllegalArgumentException("글 수정권한이 없습니다.");
		}
		List<UploadFile> uploadFile = uploadFileRepository.findAllByBoardsId(id);

		// uploadFileRepository.deleteAll(uploadFile);
		// board.getUploadFiles().clear();

		List<String> storeFileResult = new ArrayList<>();

		if(multipartFiles != null) {
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
					board.getUploadFiles().add(uploadFileSave);
					storeFileResult.add(uploadFiles);
				}
			}
		}



		board.setUpdate(boardDto.getTitle(),boardDto.getContent());
		boardRepository.save(board);
		return BoardResponseDto.toDto(board);
	}

	// 게시글 삭제
	public void delete(Long id, User user) {
		// 매개변수 id를 기반으로, 게시글이 존재하는지 먼저 찾음
		// 게시글이 없으면 오류 처리
		Board board = boardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("Board Id를 찾을 수 없습니다!");
		});

		if(!board.getUser().getId().equals(user.getId())){
			throw new IllegalArgumentException("글 삭제권한이 없습니다.");
		}
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

	public Page<BoardShowSortDto> findAllByUserAndClassification(User user, String classificationString, Pageable pageable){

		Classification classification = classificationRepository.findByCategory(classificationString).orElseThrow(() -> {
			return new IllegalArgumentException(classificationString + "에는 글 쓴 것이 없습니다.");
		});


		Page<Board> boards = boardRepository.findAllByUserAndClassification(user, classification, pageable);
		return getBoardShowSortDtos(boards);
	}


	public Page<BoardShowSortDto> findAllByUser(User user, Pageable pageable){
		Page<Board> boards = boardRepository.findAllByUser(user, pageable);
		return getBoardShowSortDtos(boards);
	}

	@Transactional(readOnly = true)
	public List<BoardShowSortDto> getWholeBoards(String s) {
		List<Board> boards = boardRepository.findAllByCategory(s);

		List<BoardShowSortDto> bt = new ArrayList<>();

		for (Board board : boards) {
			List<String> likedName = board.getLikes().stream()
				.map(like -> like.getUser().getNickname())
				.collect(Collectors.toList());

			List<String> filenames = board.getUploadFiles().stream()
				.map(UploadFile::getStoreFilePath)
				.collect(Collectors.toList());

			BoardShowSortDto build = BoardShowSortDto.builder()
				.id(board.getId())
				.title(board.getTitle())
				.content(board.getContent())
				.views(board.getViews())
				.writer(board.getUser().getNickname())
				.likesCount(board.getLikes().size())
				.classification(board.getClassification().getCategory())
				.liked(likedName)
				.imageUrl(filenames)
				.build();

			bt.add(build);
		}
		return bt;
	}


	private Page<BoardShowSortDto> getBoardShowSortDtos(Page<Board> boards) {
		return boards.map(board -> {
			if (board.getUser() == null) {
				throw new RuntimeException("User is null for board id: " + board.getId());
			}

			List<String> likedName = board.getLikes().stream()
				.map(like -> like.getUser().getNickname())
				.collect(Collectors.toList());

			List<String> filenames = board.getUploadFiles().stream()
					.map(UploadFile::getStoreFilePath)
					.collect(Collectors.toList());

			return new BoardShowSortDto(board.getId(),
					board.getTitle(),
					board.getContent(),
					board.getViews(),
					board.getUser().getNickname(),
					board.getLikes().size(),
				board.getClassification().getCategory(),
				likedName,filenames);
		});
	}
}
