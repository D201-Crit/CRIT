package com.ssafy.crit.common.util;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.crit.boards.entity.feeds.UploadFile;
import com.ssafy.crit.boards.entity.feeds.UploadFileRepository;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UploadUtil {

	// @Value("${file.dir}")
	private static String fileDir =  "C:\\files\\";

	public NeedsUpload storeFile(MultipartFile multipartFile) throws IOException {
		if (multipartFile.isEmpty()) {
			return null;
		}

		String uploadFileName = multipartFile.getOriginalFilename();
		String storeFileName = createStoreFileName(uploadFileName);
		String fullPath = getFullPath(storeFileName);
		multipartFile.transferTo(new File(fullPath));

		NeedsUpload needsUpload = NeedsUpload.builder()
			.originalName(uploadFileName)
			.storeName(storeFileName)
			.storePath(fullPath)
			.build();

		return needsUpload;

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

	@Getter
	@Builder
	public static class NeedsUpload{
		String originalName;
		String storeName;
		String storePath;

		public NeedsUpload(String originalName, String storeName, String storePath) {
			this.originalName = originalName;
			this.storeName = storeName;
			this.storePath = storePath;
		}
	}
}
