package com.ssafy.crit.shorts.controller;


import com.ssafy.crit.shorts.dto.ShortsDto;
import com.ssafy.crit.shorts.service.ShortsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/shorts")
@RequiredArgsConstructor
public class ShortsController {

    private final ShortsService shortsService;

    @PostMapping
    public ShortsDto create(@RequestPart("shorts") ShortsDto shortsDto, @RequestPart("file") MultipartFile file) throws IOException {
        return shortsService.create(shortsDto, file);
    }

    @GetMapping
    public List<ShortsDto> getAll() {
        return shortsService.getAll();
    }

    @GetMapping("/{id}")
    public ShortsDto read(@PathVariable Long id) {
        return shortsService.read(id);
    }

    @PutMapping("/{id}")
    public ShortsDto update(@PathVariable Long id, @RequestBody ShortsDto shortsDto) {
        return shortsService.update(id, shortsDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        shortsService.delete(id);
    }
}