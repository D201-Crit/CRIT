package com.ssafy.crit.boards.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.Board;
import com.ssafy.crit.boards.repository.BoardRepository;
import com.ssafy.crit.boards.service.BoardDto;
import com.ssafy.crit.challenge.entity.Challenge;
import com.ssafy.crit.imsimember.entity.Member;
import com.ssafy.crit.message.response.Response;
import com.ssafy.crit.boards.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final BoardRepository boardRepository;


    // 전체 게시글 조회
    @GetMapping("/boards")
    public Response getBoards() {
        return new Response("성공", "전체 게시물 리턴", boardService.getBoards());
    }


    // 개별 게시글 조회
    @GetMapping("/boards/{id}")
    public Response<?> getBoard(@PathVariable("id") Long id) {
        return new Response<>("성공", "개별 게시물 리턴", boardService.getBoard(id));
    }

    // 게시글 작성
    @PostMapping("/boards/write")
    public Response<?> write(@RequestBody BoardDto boardDto, HttpServletRequest httpServletRequest) {

        User user = getUser(httpServletRequest);

        return new Response<>("성공", "글 작성 성공", boardService.write(boardDto, user));
    }

    // 게시글 수정
    @PutMapping("/boards/update/{id}")
    public Response<?> edit(@RequestBody BoardDto boardDto, @PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        // 원래 로그인을 하면, User 정보는 세션을 통해서 구하고 주면 되지만,
        // 지금은 핵심 개념을 알기 위해서, JWT 로그인은 생략하고, 임의로 findById 로 유저 정보를 넣어줬습니다.

        // 추후에 JWT 로그인을 배우고나서 적용해야할 것

        // 1. 현재 요청을 보낸 유저의 JWT 토큰 정보(프론트엔드가 헤더를 통해 보내줌)를 바탕으로
        // 현재 로그인한 유저의 정보가 PathVariable로 들어오는 BoardID 의 작성자인 user정보와 일치하는지 확인하고
        // 맞으면 아래 로직 수행, 틀리면 다른 로직(ResponseFail 등 커스텀으로 만들어서) 수행
        // 이건 if문으로 처리할 수 있습니다. * 이 방법 말고 service 내부에서 확인해도 상관 없음
        User user = getUser(httpServletRequest);
        Board board = boardRepository.findById(id).orElseThrow();
        if (user.getId().equals(board.getUser())) {
            return new Response<>("성공", "글 수정 성공", boardService.update(id, boardDto));
        }

        return null;
    }

    // 게시글 삭제
    @DeleteMapping("/boards/delete/{id}")
    public Response<?> delete(@PathVariable("id") Long id) {
        // 이것도 마찬가지로, JWT(로그인 관련) 공부를 하고나서 현재 이 요청을 보낸 로그인된 유저의 정보가
        // 게시글의 주인인지 확인하고, 맞으면 삭제 수행 후 리턴해주고, 틀리면 에러 리턴해주면 됩니다.

        boardService.delete(id); // 이 메소드는 반환값이 없으므로 따로 삭제 수행해주고, 리턴에는 null을 넣어줌
        return new Response<>("성공", "글 삭제 성공", null);
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
