package com.ssafy.crit.auth.controller;

import com.ssafy.crit.common.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final S3Uploader s3Uploader;
    @GetMapping("/test")
    public String getTest() {
        System.out.println("===================testing=====================");
        return "success Test";
    }

    @PostMapping("/upload")
    public String upload(@RequestPart("file") MultipartFile multipartFile) throws Exception {
        return s3Uploader.uploadFiles(multipartFile, "shorts");
    }

}
