package com.ssafy.crit.imsimember.service;

import com.ssafy.crit.imsimember.service.RegisterDto;
import com.ssafy.crit.imsimember.entity.Member;
import com.ssafy.crit.imsimember.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Member register(RegisterDto registerDto){
        Member member = new Member();
        member.setName(registerDto.getName());
        member.setPassword(registerDto.getPassword());
        member.setMembername(registerDto.getMembername());

        return memberRepository.save(member);
    }

    public List<Member>  findAll() {
        return memberRepository.findAll();
    }

    public Member findMember(Long id){
        return memberRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("user Id를 찾을 수 없습니다.");
        });
    }
}
