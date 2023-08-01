package com.ssafy.crit.shorts.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShortsService {

    private final ShortsRepository shortsRepository;
    private final UserRepository userRepository;
    private final HashTagRepository hashTagRepository;
    private final HashTagShortsRepository hashTagShortsRepository;

    private static final String EXTENSION = "png";
    private static final String DEFAULT_IMAGE_PATH = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\thumbnail\\crit-demo.png";
    private static final String shortsSavePath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\shorts\\";
    private static final String thumbnailSavePath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\thumbnail\\";


    @Transactional
    public ShortsResponseDto create(ShortsDto shortsDto, MultipartFile file, String userId) throws Exception{
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("userId가 없음"));

        /*랜덤식별자_원래파일이름 = 저장될 파일이름 지정*/
        String savedFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String savedFilePath = shortsSavePath + savedFileName;
        // 로컬에 파일 저장
        Files.copy(file.getInputStream(), Paths.get(savedFilePath));
        // 썸네일 이미지 추출 및 로컬에 저장
        String thumbnailPath = extractThumbnailImage(savedFileName, savedFilePath);

        ShortsResponseDto shortsResponseDto = ShortsResponseDto.builder()
                .title(shortsDto.getTitle())
                .content(shortsDto.getContent())
                .shortsUrl(savedFilePath)
                .shortsName(savedFileName)
                .thumbnailUrl(thumbnailPath)
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


    /**
     * 영상에서 썸네일 이미지 추출하기
     */
    public String extractThumbnailImage(String shortsName, String savedFilePath) {
        try {
            // MultipartFile을 File로 변환
            Picture picture = FrameGrab.getFrameFromFile(new File(savedFilePath), 0);
            BufferedImage bufferedImage = AWTUtil.toBufferedImage(picture);

            // 이미지 파일 이름 설정 (영상 파일 이름에 "_thumbnail"을 붙임)
            String thumbnailFileName = shortsName.replaceFirst("[.][^.]+$", "") + "_thumbnail." + EXTENSION;
            String thumbnailFilePath = thumbnailSavePath + thumbnailFileName;

            // 썸네일 이미지 저장
            ImageIO.write(bufferedImage, EXTENSION, new File(thumbnailFilePath));
            return thumbnailFilePath;
        } catch (IOException | JCodecException e) {
            e.printStackTrace();
        }
        return DEFAULT_IMAGE_PATH;
    }
}
