package com.ssafy.crit.boards.service;


import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.Classification;
import com.ssafy.crit.boards.service.BoardDto;
import com.ssafy.crit.boards.entity.Board;
import com.ssafy.crit.boards.repository.BoardRepository;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.imsimember.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    //전체 게시물
    @Transactional(readOnly = true)
    public List<BoardDto> getBoards() {
        List<Board> boards = boardRepository.findAll();
        List<BoardDto> boardDtos = new ArrayList<>();
        boards.forEach(s -> {
            boardDtos.add(BoardDto.toDto(s));
        });
        return boardDtos;
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
    public BoardSaveRequestDto write(BoardSaveRequestDto boardSaveRequestDto, User user) {
        Board board = Board.builder()
                .title(boardSaveRequestDto.getTitle())
                .content(boardSaveRequestDto.getContent())
                .classification(Classification.FreePost)
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

        return BoardDto.toDto(Board.builder()
                .title(boardDto.getTitle())
                .content(board.getContent())
                        .user(user)
                .build());
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

    // 챌린지 생성 완료시 방 만들기
//    public Board createChallengeBoard(Challenge challenge) throws Exception{
//        Board.builder()
//                .title(challenge.getName() + "Board")
//                .c
//    }
    
}
