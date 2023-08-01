package com.ssafy.crit.auth.util;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.crit.boards.entity.feeds.UploadFile;
import com.ssafy.crit.boards.entity.feeds.UploadFileRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UploadUtil {

	private final UploadFileRepository uploadFileRepository;

	// @Value("${file.dir}")
	private static String fileDir =  "C:\\files\\";

	public UploadFile storeFile(MultipartFile multipartFile) throws IOException {
		if (multipartFile.isEmpty()) {
			return null;
		}

		String uploadFileName = multipartFile.getOriginalFilename();
		String storeFileName = createStoreFileName(uploadFileName);
		String fullPath = getFullPath(storeFileName);
		multipartFile.transferTo(new File(fullPath));


		UploadFile uploadFile = UploadFile.builder()
			.storeFilePath(fullPath)
			.uploadFileName(uploadFileName)
			.storeFileName(storeFileName)
			.build();

		uploadFileRepository.save(uploadFile);

		return uploadFile;

	}

	private String createStoreFileName(String originalFilename) {
		String ext = extractExt(originalFilename);
		String uuid = UUID.randomUUID().toString();
		return uuid + "." + ext;
	}

	private String extractExt(String originalFilename) {
		int pos = originalFilename.lastIndexOf(".");
		return originalFilename.substring(pos + 1);
	}

	public String getFullPath(String filename) {
		return fileDir + filename;
	}

}
