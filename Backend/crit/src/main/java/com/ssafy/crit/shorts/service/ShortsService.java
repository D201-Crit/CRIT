package com.ssafy.crit.shorts.service;

import com.ssafy.crit.imsimember.entity.Member;
import com.ssafy.crit.imsimember.repository.MemberRepository;
import com.ssafy.crit.shorts.dto.ShortsDto;
import com.ssafy.crit.shorts.entity.HashTag;
import com.ssafy.crit.shorts.entity.HashTagShorts;
import com.ssafy.crit.shorts.entity.Shorts;
import com.ssafy.crit.shorts.repository.HashTagRepository;
import com.ssafy.crit.shorts.repository.HashTagShortsRepository;
import com.ssafy.crit.shorts.repository.ShortsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShortsService {

    private final ShortsRepository shortsRepository;
    private final MemberRepository memberRepository;
    private final HashTagRepository hashTagRepository; // HashTag를 위한 repository
    private final HashTagShortsRepository hashTagShortsRepository; // HashTagShorts를 위한 repository

    @Transactional
    public ShortsDto create(ShortsDto shortsDto){
        Member member = memberRepository.findByName(shortsDto.getName());

        Shorts shorts = new Shorts();
        shorts.setTitle(shortsDto.getTitle());
        shorts.setShortsUrl(shortsDto.getShortsUrl());
        shorts.setMemberName(member);
        shorts.setViews(0);

        shortsRepository.save(shorts);

        for(String hashTagName : shortsDto.getHashTagNames()){
            HashTag hashTag = hashTagRepository.findByHashTag(hashTagName);
            if(hashTag == null) {
                hashTag = new HashTag();
                hashTag.setHashTag(hashTagName);
                hashTagRepository.save(hashTag);
            }

            HashTagShorts hashTagShorts = new HashTagShorts();
            hashTagShorts.setShorts(shorts);
            hashTagShorts.setHashTag(hashTag);

            hashTagShortsRepository.save(hashTagShorts);
        }


        return ShortsDto.toDto(shorts);
    }

//    @Transactional(readOnly = true)
//    public ShortsDto read(Long id){
//        Shorts shorts = shortsRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid shorts id."));
//        return ShortsDto.toDto(shorts);
//    }

    @Transactional
    public ShortsDto read(Long id){
        Shorts shorts = shortsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid shorts id."));
        shorts.getHashTagShortsList().size(); // hashTagShortsList를 로딩합니다.
        return ShortsDto.toDto(shorts);
    }


    @Transactional
    public ShortsDto update(Long id, ShortsDto shortsDto){
        Shorts shorts = shortsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid shorts id."));
        shorts.setTitle(shortsDto.getTitle());
        shorts.setShortsUrl(shortsDto.getShortsUrl());
        // Add other fields to update as necessary.
        return ShortsDto.toDto(shorts);
    }

    @Transactional
    public void delete(Long id){
        Shorts shorts = shortsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid shorts id."));
        shortsRepository.delete(shorts);
    }

    @Transactional(readOnly = true)
    public List<ShortsDto> list(){
        return shortsRepository.findAll().stream()
                .map(ShortsDto::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ShortsDto> getAll() {
        return shortsRepository.findAll().stream()
                .map(ShortsDto::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ShortsDto get(Long id) {
        return shortsRepository.findById(id)
                .map(ShortsDto::toDto)
                .orElseThrow(() -> new RuntimeException("Shorts not found with id " + id));
    }
}
