package crud.prac.service;


import crud.prac.domain.FileEntity;
import crud.prac.domain.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    @Value("${file.dir}")
    private String fileDir;

    private final FileRepository fileRepository;

    public Long saveFile(MultipartFile files) throws IOException {
        if (files.isEmpty()) {
            return null;
        }

        //원래 파일 이름
        String origName = files.getOriginalFilename();

        //파일 이름으로 쓸 uuid 생성
        String uuid = UUID.randomUUID().toString();

        //확장자 추출 (ex : .png, .img 등)
        String extensions = origName.substring(origName.lastIndexOf("."));

        //uuid와 확장자 결합
        String savedName = uuid + extensions;

        //파일을 불러올 때 사용할 경로
        String savedPath = fileDir + savedName;

        //파일 엔티티
        FileEntity file = FileEntity.builder()
                .orgNm(origName)
                .savedNm(savedName)
                .savedPath(savedPath)
                .build();

        // 실제로 로컬에 uuid를 파일명으로 저장
        files.transferTo(new File(savedPath));

        // 데이터베이스에 파일 정보 저장
        FileEntity savedFile = fileRepository.save(file);

        return savedFile.getId();
    }
}
