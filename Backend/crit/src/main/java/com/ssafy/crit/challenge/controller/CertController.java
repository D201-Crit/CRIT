package com.ssafy.crit.challenge.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.challenge.dto.*;
import com.ssafy.crit.challenge.entity.IsCert;
import com.ssafy.crit.challenge.service.CertService;
import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;
import com.ssafy.crit.message.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/cert")
public class CertController {
    private final CertService certService;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    /**
     * 0801 조경호
     * 사진 인증 추가
     */
    @PostMapping(path = "/img", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Response<CertImgResponseDto>> imgCertification(@RequestPart(value = "file") MultipartFile file, @RequestPart(value = "requestDto") CertImgRequestDto requestDto, HttpServletRequest httpServletRequest)
            throws Exception {

        User user = getUser(httpServletRequest);
        IsCert isCert = certService.imgCertification(requestDto, user, file);

        return new ResponseEntity<>(new Response<>("success", "사진 인증 성공",
                new CertImgResponseDto(isCert)), HttpStatus.OK);
    }


    @PostMapping("/video")
    public ResponseEntity<Response<CertVideoResponseDto>> videoCertification(@RequestBody CertVideoRequestDto certVideoRequestDto, HttpServletRequest httpServletRequest)
            throws Exception {
        User user = getUser(httpServletRequest);
        IsCert isCert = certService.videoCertification(certVideoRequestDto, user);
        return new ResponseEntity<>(new Response<>("success", "인증내역",
                new CertVideoResponseDto(isCert)), HttpStatus.OK);
    }


    // 해당 챌린지의 내 인증 목록 불러오기
    @GetMapping("/list/{challengeId}")
    public ResponseEntity<Response<List<IsCertResponseDto>>> getCertifcation(@PathVariable("challengeId") Long challengeId, HttpServletRequest httpServletRequest) throws Exception {
        User user = getUser(httpServletRequest);
        List<IsCert> isCertList = certService.getIsCertList(challengeId, user);

        List<IsCertResponseDto> result = isCertList.stream().map(isCert -> new IsCertResponseDto(isCert)).collect(Collectors.toList());
        return new ResponseEntity<>(new Response<>("success", "인증 목록 반환", result), HttpStatus.OK);
    }


    private User getUser(HttpServletRequest httpServletRequest) {
        String bearer = httpServletRequest.getHeader("Authorization").substring(7);
        String userId = (String) jwtProvider.get(bearer).get("userId");

        User user = userRepository.findById(userId).orElseThrow(() -> {
            return new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
        });
        return user;
    }


}
