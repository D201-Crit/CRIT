package message.message.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import message.message.dto.BoardDto;
import message.message.entity.Member;
import message.message.entity.MemberRepository;
import message.message.response.Response;
import message.message.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class BoardController {


    private final MemberRepository memberRepository;
    private final BoardService boardService;


    // 전체 게시글 조회
    @ApiOperation(value = "전체 게시글 보기", notes = "전체 게시글을 조회한다.")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/boards")
    public Response getBoards() {
        return new Response("성공", "전체 게시물 리턴", boardService.getBoards());
    }



    // 개별 게시글 조회
    @ApiOperation(value = "개별 게시글 보기", notes = "개별 게시글 조회한다.")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/boards/{id}")
    public Response getBoard(@PathVariable("id") Long id) {
        return new Response("성공", "개별 게시물 리턴", boardService.getBoard(id));
    }



    // 게시글 작성
    @ApiOperation(value = "게시글 작성", notes = "게시글을 작성한다.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/boards/write")
    public Response write(@RequestBody BoardDto boardDto) {
        // 원래 로그인을 하면, User 정보는 세션을 통해서 구하고 주면 되지만,
        // 지금은 핵심 개념을 알기 위해서, JWT 로그인은 생략하고, 임의로 findById 로 유저 정보를 넣어줬습니다.

        Member member = memberRepository.findById(1L).get();
        return new Response("성공", "글 작성 성공", boardService.write(boardDto, member));
    }



    // 게시글 수정
    @ApiOperation(value = "게시글 수정", notes = "게시글을 수정한다.")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/boards/update/{id}")
    public Response edit(@RequestBody BoardDto boardDto, @PathVariable("id") Long id) {
        // 원래 로그인을 하면, User 정보는 세션을 통해서 구하고 주면 되지만,
        // 지금은 핵심 개념을 알기 위해서, JWT 로그인은 생략하고, 임의로 findById 로 유저 정보를 넣어줬습니다.

        // 추후에 JWT 로그인을 배우고나서 적용해야할 것

        // 1. 현재 요청을 보낸 유저의 JWT 토큰 정보(프론트엔드가 헤더를 통해 보내줌)를 바탕으로
        // 현재 로그인한 유저의 정보가 PathVariable로 들어오는 BoardID 의 작성자인 user정보와 일치하는지 확인하고
        // 맞으면 아래 로직 수행, 틀리면 다른 로직(ResponseFail 등 커스텀으로 만들어서) 수행
        // 이건 if문으로 처리할 수 있습니다. * 이 방법 말고 service 내부에서 확인해도 상관 없음

        Member member = memberRepository.findById(1L).get();
        return new Response("성공", "글 수정 성공", boardService.update(id, boardDto));
    }




    // 게시글 삭제
    @ApiOperation(value = "게시글 삭제", notes = "게시글을 삭제한다.")
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/boards/delete/{id}")
    public Response delete(@PathVariable("id") Long id) {
        // 이것도 마찬가지로, JWT(로그인 관련) 공부를 하고나서 현재 이 요청을 보낸 로그인된 유저의 정보가
        // 게시글의 주인인지 확인하고, 맞으면 삭제 수행 후 리턴해주고, 틀리면 에러 리턴해주면 됩니다.

        boardService.delete(id); // 이 메소드는 반환값이 없으므로 따로 삭제 수행해주고, 리턴에는 null을 넣어줌
        return new Response("성공", "글 삭제 성공", null);
    }
}
