package com.ssafy.crit.boards.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.Classification;
import com.ssafy.crit.boards.repository.ClassificationRepository;
import com.ssafy.crit.boards.service.dto.BoardDto;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.repository.BoardRepository;

import com.ssafy.crit.boards.service.dto.BoardSaveRequestDto;
import com.ssafy.crit.boards.service.dto.BoardShowSortDto;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

	private final BoardRepository boardRepository;
	private final UserRepository userRepository;
	private final ClassificationRepository classificationRepository;

	//전체 게시물
	@Transactional(readOnly = true)
	public Page<BoardShowSortDto> getBoards(Pageable pageable) {
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

	// 게시물 작성
	// public BoardSaveRequestDto write(BoardSaveRequestDto boardSaveRequestDto, User user) {
	//
	//     Classification classification = classificationRepository.findById(boardSaveRequestDto.getClassification()).orElseThrow();
	//
	//     Board board = Board.builder()
	//             .title(boardSaveRequestDto.getTitle())
	//             .content(boardSaveRequestDto.getContent())
	//             .classification(classification)
	//             .user(user)
	//             .build();
	//     boardRepository.save(board);
	//     return BoardSaveRequestDto.toSaveRequestDto(board);
	// }

	public BoardSaveRequestDto write(BoardSaveRequestDto boardSaveRequestDto, User user) {

		Classification classification = classificationRepository.findByCategory(boardSaveRequestDto.getClassification())
			.orElseGet(() -> {
				// Create and save a new Classification.
				Classification newClassification = new Classification();
				// Ensure that you're setting the Category here.
				newClassification.setCategory(boardSaveRequestDto.getClassification());
				classificationRepository.save(newClassification);
				return newClassification;
			});

		Board board = Board.builder()
			.title(boardSaveRequestDto.getTitle())
			.content(boardSaveRequestDto.getContent())
			.classification(classification)
			.user(user)
			.build();

		boardRepository.save(board);

		return BoardSaveRequestDto.toSaveRequestDto(board);
	}


	// 게시물 수정
	public BoardDto update(Long id, BoardDto boardDto) {
		Board board = boardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("Board Id를 찾을 수 없습니다!");
		});

		User user = userRepository.findById(board.getUser().getId()).orElseThrow();

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
			return new BoardShowSortDto(board.getId(),
					board.getTitle(),
					board.getContent(),
					board.getViews(),
					board.getUser().getId().toString(),
					board.getLikes().size());
		});
	}
}
