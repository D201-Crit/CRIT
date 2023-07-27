package com.ssafy.crit.imsimember.service;

import com.ssafy.crit.imsimember.entity.Follow;
import com.ssafy.crit.imsimember.repository.FollowRepository;
import com.ssafy.crit.imsimember.entity.Member;
import com.ssafy.crit.imsimember.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    public MemberRequestDto save(RegisterDto registerDto){
        Member member = new Member();
        member.setName(registerDto.getName());
        member.setPassword(registerDto.getPassword());
        member.setMembername(registerDto.getMembername());

        memberRepository.save(member);

        return MemberRequestDto.toMemberRequestDto(member);
    }

    public List<MemberRequestDto> findAll() {
        List<Member> members = memberRepository.findAll();
        return MemberRequestDto.toMemberRequestDto(members);
    }

    public MemberRequestDto findMember(Long id){
        Member member = memberRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("user Id를 찾을 수 없습니다.");
        });

        return MemberRequestDto.toMemberRequestDto(member);
    }

    public MemberResponseDto follow(FollowRequestDto followRequestDto) {
        Member user1 = memberRepository.findByName(followRequestDto.getFollower())
                .orElseThrow(() -> new IllegalArgumentException("User with nickname " + followRequestDto.getFollower() + " does not exist."));
        Member user2 = memberRepository.findByName(followRequestDto.getFollowing())
                .orElseThrow(() -> new IllegalArgumentException("User with nickname " + followRequestDto.getFollowing() + " does not exist."));
        Optional<Follow> optionalFollow = followRepository.findByFollowerAndFollowing(user1,user2);

        if (optionalFollow.isEmpty()) {
            Follow followFunc = Follow.builder()
                    .follower(user1)
                    .following(user2).build();
            followRepository.save(followFunc);
            user1.addMemberTofollower(followFunc);
            user2.addMemberTofollowing(followFunc);
        } else {
            Follow follow = optionalFollow.get();
            user1.removeMemberTofollower(follow);
            user2.removeMemberTofollowing(follow);
            followRepository.deleteByFollowerAndFollowing(user1,user2);
        }

        return MemberResponseDto.toMemberResponseDto(user1);
    }



}
