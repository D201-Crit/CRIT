package com.ssafy.crit.challenge.controller;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.challenge.dto.CertImgRequestDto;
import com.ssafy.crit.challenge.entity.IsCert;
import com.ssafy.crit.challenge.service.CertService;
import com.ssafy.crit.message.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/cert")
public class CertController {
    private final CertService certService;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    /**
     * 0801 조경호
     * 사진 인증 추가
     * */
    @PostMapping(path = "/img", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Response<String>> imgCertification(@RequestPart(value = "file") MultipartFile file, @RequestPart(value = "requestDto") CertImgRequestDto requestDto, HttpServletRequest httpServletRequest)
            throws Exception {
        User user = getUser(httpServletRequest);
        certService.imgCertification(requestDto, user, file);

        return new ResponseEntity<>(new Response<>("success", "사진 인증 성공", "인증이 완료되었습니다."),
                HttpStatus.OK);
    }

//    @GetMapping("/list/{challengeId}")
//    public ResponseEntity<Response<List<IsCert>>>

    private User getUser(HttpServletRequest httpServletRequest) {
        String bearer = httpServletRequest.getHeader("Authorization").substring(7);
        String userId = (String) jwtProvider.get(bearer).get("userId");

        User user = userRepository.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("유저 ID를 찾을수 없습니다.");
        });
        return user;
    }
}
