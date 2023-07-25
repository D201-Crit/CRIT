package message.message.service;


import lombok.RequiredArgsConstructor;
import message.message.dto.BoardDto;
import message.message.entity.Board;
import message.message.entity.BoardRepository;
import message.message.entity.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;

    //전체 게시물
    @Transactional(readOnly = true)
    public List<BoardDto> getBoards(){
        List<Board> boards = boardRepository.findAll();
        List<BoardDto> boardDtos = new ArrayList<>();
        boards.forEach(s -> {
            boardDtos.add(BoardDto.toDto(s));
        });
        return boardDtos;
    }

    //개별 게시물 조회
    @Transactional(readOnly = true)
    public BoardDto getBoard(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("Board Id를 찾을 수 없습니다.");
        });
        return BoardDto.toDto(board);
    }

    // 게시물 작성
    public BoardDto write(BoardDto boardDto, Member member){
        Board board = new Board();
        board.setTitle(boardDto.getTitle());
        board.setContent(board.getContent());
        board.setMember(member);
        boardRepository.save(board);
        return BoardDto.toDto(board);
    }

    // 게시물 수정
    public BoardDto update(Long id, BoardDto boardDto) {
        Board board = boardRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("Board Id를 찾을 수 없습니다!");
        });

        board.setTitle(boardDto.getTitle());
        board.setContent(boardDto.getContent());

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
}
