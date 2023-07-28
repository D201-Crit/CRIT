package com.ssafy.crit.shorts.controller;


import com.ssafy.crit.shorts.dto.ShortsDto;
import com.ssafy.crit.shorts.service.ShortsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/shorts")
@RequiredArgsConstructor
public class ShortsController {

    private final ShortsService shortsService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ShortsDto> create(@RequestPart(value="shortsDto") ShortsDto shortsDto,@RequestPart(value="file", required = false) MultipartFile file) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(shortsService.create(shortsDto,file));
    }

    @GetMapping
    public ResponseEntity<List<ShortsDto>> getAll() {
        return ResponseEntity.ok(shortsService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShortsDto> read(@PathVariable Long id) {
        return ResponseEntity.ok(shortsService.get(id));
    }

    @PutMapping(value= "/{id}",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ShortsDto> update(@PathVariable Long id, @RequestBody ShortsDto shortsDto) {
        return ResponseEntity.ok(shortsService.update(id, shortsDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        shortsService.delete(id);
        return ResponseEntity.noContent().build();
    }
}