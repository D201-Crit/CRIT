package com.ssafy.crit.shorts.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.common.s3.S3Uploader;
import com.ssafy.crit.shorts.dto.HashTagDto;
import com.ssafy.crit.shorts.dto.ShortsDto;
import com.ssafy.crit.shorts.dto.ShortsResponseDto;
import com.ssafy.crit.shorts.entity.HashTag;
import com.ssafy.crit.shorts.entity.HashTagShorts;
import com.ssafy.crit.shorts.entity.Shorts;
import com.ssafy.crit.shorts.repository.HashTagRepository;
import com.ssafy.crit.shorts.repository.HashTagShortsRepository;
import com.ssafy.crit.shorts.repository.ShortsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jcodec.api.FrameGrab;
import org.jcodec.api.JCodecException;
import org.jcodec.common.model.Picture;
import org.jcodec.scale.AWTUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShortsService {

    private final ShortsRepository shortsRepository;
    private final UserRepository userRepository;
    private final HashTagRepository hashTagRepository;
    private final HashTagShortsRepository hashTagShortsRepository;
    private final S3Uploader s3Uploader;

    private static final String shortsDirectory = "shorts";
    private static final String thumnailDirectory = "thumbnail";



    @Transactional
    public ShortsResponseDto create(ShortsDto shortsDto, MultipartFile file, String userId) throws Exception{
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("userId가 없음"));

        String shortsUrl = s3Uploader.uploadFiles(file, shortsDirectory);
        String thumnailUrl = s3Uploader.uploadThumbnail(file, thumnailDirectory);

        ShortsResponseDto shortsResponseDto = ShortsResponseDto.builder()
                .title(shortsDto.getTitle())
                .content(shortsDto.getContent())
                .shortsUrl(shortsUrl)
                .shortsName(shortsUrl)
                .thumbnailUrl(thumnailUrl)
                .hashTagNames(shortsDto.getHashTagNames())
                .build();

        Shorts shorts = shortsResponseDto.toEntity(user);
        shortsRepository.save(shorts);

        /**
         * 해당하는 해쉬태그가 없으면 바로 생성하고 그 후 중간테이블 생성
         */
        for(String hashTagName : shortsDto.getHashTagNames()) {
            Optional<HashTag> optionalHashTag = hashTagRepository.findByHashTag(hashTagName);

            HashTag hashTag = null;
            if (!optionalHashTag.isPresent()) {
                HashTagDto hashTagDto = HashTagDto.builder()
                        .hashTag(hashTagName)
                        .build();
                hashTag = hashTagDto.toEntity();
            } else {
                hashTag = optionalHashTag.get();
            }
            hashTagRepository.saveAndFlush(hashTag);
            // 중계 테이블 생성
            HashTagShorts hashTagShorts = HashTagShorts.builder()
                    .shorts(shorts)
                    .hashTag(hashTag)
                    .build();
            hashTagShortsRepository.saveAndFlush(hashTagShorts);
        }
        return shortsResponseDto;
    }

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
