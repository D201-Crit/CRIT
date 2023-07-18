package crud.prac.web;

import crud.prac.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequiredArgsConstructor

// 추후 이거 ShortsController, PostsController에 넣어서 사용
public class FileController {

    private final FileService fileService;

    @GetMapping("/upload")
    public String UploadForm(){
        return "/";
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file,@RequestParam("files") List<MultipartFile> files) throws IOException {
        fileService.saveFile(file);

        for (MultipartFile multipartFile : files) {
            fileService.saveFile(multipartFile);
        }

        return "redirect:/";
    }
}
