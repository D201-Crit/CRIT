package com.ssafy.crit.shorts.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.message.response.Response;
import com.ssafy.crit.shorts.dto.ShortsDto;
import com.ssafy.crit.shorts.service.ShortsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/shorts")
@RequiredArgsConstructor
public class ShortsController {

    private final ShortsService shortsService;
    private final JwtProvider jwtProvider;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public Response<?> create(@RequestPart(value="shortsDto") ShortsDto shortsDto, @RequestPart(value="file") MultipartFile file, HttpServletRequest request) throws Exception {
        User user = jwtProvider.extractUser(request);
        return new Response<>("성공", "쇼츠 생성 완료", shortsService.create(shortsDto, file, user));
    }

    @GetMapping
    public Response<?> getAll() {
        return new Response<>("성공", "전체 쇼츠 조회 완료", shortsService.getAll());
    }

    @GetMapping("/{shortsId}")
    public Response<?> read(@PathVariable Long shortsId) {
        return new Response<>("성공", "단건 쇼츠 조회 완료", shortsService.get(shortsId));
    }

    @PutMapping(value= "/{shortsId}",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public Response<?> update(@PathVariable Long shortsId, @RequestBody ShortsDto shortsDto) {
        return new Response<>("성공", "쇼츠 수정 완료", shortsService.update(shortsId, shortsDto));
    }

    @DeleteMapping("/{shortsId}")
    public Response<?> delete(@PathVariable Long shortsId) {
        shortsService.delete(shortsId);
        return new Response<>("성공", "쇼츠 삭제 완료", "삭제완료");
    }

    // 최신순, 좋아요순, 조회순 -> 메인 페이지에 썸네일 이미지
    @GetMapping("/main")
    public Response<?> getMainThumbnail() {
        return new Response<>("성공", "메인 페이지 쇼츠 가져오기", shortsService.getMainThumbnail());
    }



}
