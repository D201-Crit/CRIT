package com.ssafy.crit.common.util;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.crit.common.s3.S3Uploader;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UploadUtil {

	// @Value("${file.dir}")
	// private static String fileDir =  "/Users/seunnng/Desktop/";

	private final AmazonS3Client amazonS3Client;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final S3Uploader s3Uploader;

	public String storeFile(MultipartFile multipartFile) throws IOException {
		if (multipartFile.isEmpty()) {
			return null;
		}

		String uploadFileName = multipartFile.getOriginalFilename();
		String storeFileName = createStoreFileName(uploadFileName);
		String fullPath = getFullPath(storeFileName);

		String uploadFiles = s3Uploader.uploadFiles(multipartFile, uploadFileName);

		return uploadFiles;

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
		return bucket + filename;
	}
}
