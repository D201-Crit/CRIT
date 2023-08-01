package com.ssafy.crit.shorts.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShortsService {

    private final ShortsRepository shortsRepository;
    private final UserRepository userRepository;
    private final HashTagRepository hashTagRepository; // HashTag를 위한 repository
    private final HashTagShortsRepository hashTagShortsRepository; // HashTagShorts를 위한 repository

    @Transactional
    public ShortsDto create(ShortsDto shortsDto, MultipartFile file) throws Exception{
        User user = userRepository.findById(shortsDto.getUserId()).orElseThrow(
                ()->{throw new IllegalArgumentException("userId가 없음");}
        );

        Shorts shorts = new Shorts();
        shorts.setTitle(shortsDto.getTitle());
        shorts.setUser(user);
        shorts.setViews(0);
        shorts.setContent(shortsDto.getContent());
        /*우리의 프로젝트경로를 담아주게 된다 - 저장할 경로를 지정*/
        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static";

        /*식별자 . 랜덤으로 이름 만들어줌*/
        UUID uuid = UUID.randomUUID();

        /*랜덤식별자_원래파일이름 = 저장될 파일이름 지정*/
        String shortsName = uuid + "_" + file.getOriginalFilename();

        /*빈 껍데기 생성*/
        /*File을 생성할건데, 이름은 "name" 으로할거고, projectPath 라는 경로에 담긴다는 뜻*/
        File saveShorts = new File(projectPath, shortsName);

        file.transferTo(saveShorts);

        /*디비에 파일 넣기*/
        shorts.setShortsName(shortsName);
        /*저장되는 경로*/
        shorts.setShortsUrl("/files/" + shortsName); /*저장된파일의이름,저장된파일의경로*/

        /*파일 저장*/
        shortsRepository.save(shorts);

        for(String hashTagName : shortsDto.getHashTagNames()) {
            HashTag hashTag = hashTagRepository.findByHashTag(hashTagName);
            if (hashTag == null) {
                hashTag = new HashTag();
                hashTag.setHashTag(hashTagName);
                hashTagRepository.saveAndFlush(hashTag);
            }

            HashTagShorts hashTagShorts = new HashTagShorts();
            hashTagShorts.setShorts(shorts);
            hashTagShorts.setHashTag(hashTag);

            hashTagShortsRepository.saveAndFlush(hashTagShorts);
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
        shorts.setContent(shortsDto.getContent());
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
