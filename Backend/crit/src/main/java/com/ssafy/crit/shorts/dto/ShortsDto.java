package com.ssafy.crit.shorts.dto;

import com.ssafy.crit.shorts.entity.Shorts;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShortsDto {
    private Long id;
    private String title;
    private String writer;
    private int views; // 조회수
    private int likesCount; // 좋아요수
    private String content;
    private String shortsUrl;
    private String thumbnailUrl;
    private List<String> liked = new ArrayList<>();
    private List<String> hashTagNames = new ArrayList<>();
    private String createdDate;

    @Builder
    public ShortsDto(Long id, String title, String writer, int views, int likesCount, String content, String shortsUrl, String thumbnailUrl, List<String> liked, List<String> hashTagNames, String createdDate) {
        this.id = id;
        this.title = title;
        this.writer = writer;
        this.views = views;
        this.likesCount = likesCount;
        this.content = content;
        this.shortsUrl = shortsUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.liked = liked;
        this.hashTagNames = hashTagNames;
        this.createdDate = createdDate;
    }

    public static ShortsDto toDto(Shorts shorts) {
        List<String> hashTagNames = shorts.getHashTags()
                .stream()
                .map(hashTagShorts -> hashTagShorts.getHashTag().getHashTag())
                .collect(Collectors.toList());

        List<String> liked = shorts.getShortsLikeTables()
                .stream()
                .map(shortsLikeTable -> shortsLikeTable.getUser().getId())
                .collect(Collectors.toList());
        return ShortsDto.builder()
                .id(shorts.getId())
                .title(shorts.getTitle())
                .shortsUrl(shorts.getShortsUrl())
                .thumbnailUrl(shorts.getThumbnailUrl())
                .content(shorts.getContent())
                .views(shorts.getViews())
                .writer(shorts.getUser().getNickname())
                .likesCount(shorts.getLikes())
                .hashTagNames(hashTagNames)
                .liked(liked)
                .createdDate(shorts.getCreatedDate().toLocalDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .build();
    }

//    public static ShortsDto toDto(Shorts shorts) {
//        ShortsDto shortsDto = new ShortsDto();
//        shortsDto.setId(shorts.getId());
//        shortsDto.setTitle(shorts.getTitle());
//        shortsDto.setShortsUrl(shorts.getShortsUrl());
//        shortsDto.setContent(shorts.getContent());
//        shortsDto.setThumbnailUrl(shorts.getThumbnailUrl());
//        shortsDto.setViewsCount(shorts.getViews());
//        shortsDto.setUserId(shorts.getUser().getId());
//        shortsDto.setLikesCount(shorts.getLikes());
//
//        List<String> hashTagNames = shorts.getHashTags()
//                .stream()
//                .map(hashTagShorts -> hashTagShorts.getHashTag().getHashTag())
//                .collect(Collectors.toList());
//
//        List<String> liked = shorts.getShortsLikeTables()
//                .stream()
//                .map(shortsLikeTable -> shortsLikeTable.getUser().getId())
//                .collect(Collectors.toList());
//
//        shortsDto.setHashTagNames(hashTagNames);
//        shortsDto.setLiked(liked);
//        return shortsDto;
//    }

}
