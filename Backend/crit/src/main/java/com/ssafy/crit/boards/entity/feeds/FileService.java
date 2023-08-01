package com.ssafy.crit.boards.entity.feeds;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.auth.util.UploadUtil;
import com.ssafy.crit.boards.entity.board.Board;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FileService {

	private final FeedsRepository feedsRepository;
	private final UploadFileRepository uploadFileRepository;
	private final UserRepository userRepository;
	private final UploadUtil uploadUtil;

	public FileResponseDto storeFiles(FileResponseDto fileResponseDto,List<MultipartFile> multipartFiles) throws IOException {
		List<String> storeFileResult = new ArrayList<>();
		for (MultipartFile multipartFile : multipartFiles) {
			if (!multipartFile.isEmpty()) {
				String fullPath = uploadUtil.getFullPath(uploadUtil.storeFile(multipartFile).getStoreFileName());
				storeFileResult.add(fullPath);
			}
		}
		Board feeds = Board.builder()
			.content(fileResponseDto.getContent())
			.user(userRepository.findById(fileResponseDto.getUserName()).get())
			.build();

		feedsRepository.save(feeds);

		fileResponseDto.setImageFiles(storeFileResult);

		return fileResponseDto;
	}

}

