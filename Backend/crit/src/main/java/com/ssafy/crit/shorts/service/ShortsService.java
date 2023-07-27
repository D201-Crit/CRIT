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
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShortsService {

    private final ShortsRepository shortsRepository;
    private final MemberRepository memberRepository;
    private final HashTagRepository hashTagRepository; // HashTag를 위한 repository
    private final HashTagShortsRepository hashTagShortsRepository; // HashTagShorts를 위한 repository

    @Transactional
    public ShortsDto create(ShortsDto shortsDto, MultipartFile file) throws IOException {
        Member member = memberRepository.findByName(shortsDto.getName()).get();

        /*우리의 프로젝트경로를 담아주게 된다 - 저장할 경로를 지정*/
        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static";
        log.info(projectPath);
        /*식별자 . 랜덤으로 이름 만들어줌*/
        UUID uuid = UUID.randomUUID();
        log.info("UUID = {}", uuid);
        /*랜덤식별자_원래파일이름 = 저장될 파일이름 지정*/
        String fileName = uuid + "_" + file.getOriginalFilename();
        log.info("fileName = {}", fileName);
        /*빈 껍데기 생성*/
        /*File을 생성할건데, 이름은 "name" 으로할거고, projectPath 라는 경로에 담긴다는 뜻*/
        File saveFile = new File(projectPath, fileName);

        file.transferTo(saveFile);

        Shorts shorts = new Shorts();
        log.info("shorts 생성자");
        shorts.setTitle(shortsDto.getTitle());
        log.info("setTitle");
        shorts.setFilename(fileName);
        log.info("fileName");
        shorts.setFilepath("/files/" + fileName);
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

    // @Transactional(readOnly = true)
    // public ShortsDto get(Long id) {
    //     return shortsRepository.findById(id)
    //             .map(ShortsDto::toDto)
    //             .orElseThrow(() -> new RuntimeException("Shorts not found with id " + id));
    // }
}
