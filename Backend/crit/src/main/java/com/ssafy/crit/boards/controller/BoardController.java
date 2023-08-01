package com.ssafy.crit.boards.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.repository.BoardRepository;
import com.ssafy.crit.boards.service.dto.BoardDto;
import com.ssafy.crit.boards.service.dto.BoardSaveRequestDto;
import com.ssafy.crit.boards.service.dto.BoardShowSortDto;
import com.ssafy.crit.message.response.Response;
import com.ssafy.crit.boards.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final BoardRepository boardRepository;


    // 전체 게시글 조회
    @GetMapping
    public Response getBoards(Pageable pageable) {
        return new Response("성공", "전체 게시물 리턴", boardService.getBoards(pageable));
    }


    // 개별 게시글 조회
    @GetMapping("/{id}")
    public Response<?> getBoard(@PathVariable("id") Long id) {
        return new Response<>("성공", "개별 게시물 리턴", boardService.getBoard(id));
    }

    // 게시글 작성
    @PostMapping("/write")
    public Response<?> write(@RequestBody BoardSaveRequestDto boardSaveRequestDto, HttpServletRequest httpServletRequest) {

        User user = getUser(httpServletRequest);

        return new Response<>("성공", "글 작성 성공", boardService.write(boardSaveRequestDto, user));
    }
    // 게시글 수정
    @PutMapping("/update/{id}")
    public Response<?> edit(@RequestBody BoardDto boardDto, @PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        User user = getUser(httpServletRequest);
        Board board = boardRepository.findById(id).orElseThrow();

        // Compare the ID of the logged-in user with the ID of the user who wrote the post
        if (user.getId().equals(board.getUser().getId())) {
            return new Response<>("성공", "글 수정 성공", boardService.update(id, boardDto));
        }

        // Return an error message if the user does not have permission to edit the post
        return new Response<>("실패", "글 수정 권한이 없습니다.", null);
    }

    // 게시글 삭제
    @DeleteMapping("/delete/{id}")
    public Response<?> delete(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        User user = getUser(httpServletRequest);
        Board board = boardRepository.findById(id).orElseThrow();

        // Compare the ID of the logged-in user with the ID of the user who wrote the post
        if (user.getId().equals(board.getUser().getId())) {
            boardService.delete(id);
            return new Response<>("성공", "글 삭제 성공", null);
        }

        // Return an error message if the user does not have permission to delete the post
        return new Response<>("실패", "글 삭제 권한이 없습니다.", null);
    }


    @GetMapping("/desc")
    public Response<?> getBoardsInDescOrder(Pageable pageable) {
        Page<BoardShowSortDto> allDesc = boardService.findAllDesc(pageable);
        return new Response<>("성공", "타이틀 내림차순", allDesc);
    }

    @GetMapping("/asc")
    public Response<?> getBoardsInAscOrder(Pageable pageable) {
        Page<BoardShowSortDto> boards = boardService.findAllAsc(pageable);
        return new Response<>("성공", "타이틀 오름차순", boards);
    }

    @GetMapping("/viewsdesc")
    public Response<?> getBoardsViewsDesc(Pageable pageable){
        Page<BoardShowSortDto> boards = boardService.orderByViewsDesc(pageable);
        return new Response<>("성공", "조회순 내림차순", boards);
    }

    @GetMapping("/viewsasc")
    public Response<?> getBoardsViewsAsc(Pageable pageable){
        Page<BoardShowSortDto> boards = boardService.orderByViewsAsc(pageable);
        return new Response<>("성공", "조회순 내림차순", boards);
    }

    @GetMapping("/containing")
    public Response<?> getFindByContaining(String part, Pageable pageable){
        Page<BoardShowSortDto> boards = boardService.findByTitleContaining(part, pageable);
        return new Response<>("성공", "포함된 단어 찾기", boards);
    }


    private User getUser(HttpServletRequest httpServletRequest) {
        String header = httpServletRequest.getHeader("Authorization");
        String bearer = header.substring(7);
        String userId = (String) jwtProvider.get(bearer).get("userId");

        User user = userRepository.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("유저 ID를 찾을수 없습니다.");
        });
        return user;
    }
}
