package com.ssafy.crit.imsimember.controller;

import com.ssafy.crit.imsimember.entity.Member;
import com.ssafy.crit.imsimember.service.FollowRequestDto;
import com.ssafy.crit.imsimember.service.MemberResponseDto;
import com.ssafy.crit.imsimember.service.RegisterDto;
import com.ssafy.crit.message.response.Response;
import com.ssafy.crit.imsimember.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/users")
    public Response<?> findAll() {
        return new Response<>("true", "조회 성공", memberService.findAll());
    }


    @GetMapping("/users/{id}")
    public Response<?> findUser(@PathVariable("id") Long id) {
        return new Response<>("true", "조회 성공", memberService.findMember(id));
    }


    @PostMapping("/auth")
    public Response<?> register(@RequestBody RegisterDto registerDto) {
        return new Response<>("true", "가입 성공", memberService.save(registerDto));
    }

    @PostMapping("/api/follow")
    public Response<?> follow(@RequestBody FollowRequestDto followRequestDto) {
        return new Response<>("true","follow 성공",memberService.follow(followRequestDto));
    }
}