package com.ssafy.crit.boards.entity.feeds;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.common.util.UploadUtil;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.repository.BoardRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FeedService {

	private final UploadFileRepository uploadFileRepository;
	private final UserRepository userRepository;
	private final UploadUtil uploadUtil;
	private final BoardRepository boardRepository;

	public FileResponseDto storeFiles(FileResponseDto fileResponseDto,List<MultipartFile> multipartFiles, User user) throws IOException {
		List<String> storeFileResult = new ArrayList<>();

		for (MultipartFile multipartFile : multipartFiles) {
			if (!multipartFile.isEmpty()) {

				UploadUtil.NeedsUpload needsUpload = uploadUtil.storeFile(multipartFile);

				UploadFile uploadFile = UploadFile.builder()
					.userName(user.getId())
					.storeFilePath(needsUpload.getStorePath())
					.uploadFileName(needsUpload.getOriginalName())
					.storeFileName(needsUpload.getStoreName())
					.build();

				uploadFileRepository.save(uploadFile);

				String fullPath = uploadUtil.getFullPath(needsUpload.getStoreName());
				storeFileResult.add(fullPath);
			}
		}
		Board board = Board.builder()
			.content(fileResponseDto.getContent())
			.user(userRepository.findById(fileResponseDto.getUserName()).get())
			.build();

		boardRepository.save(board);

		fileResponseDto.setImageFiles(storeFileResult);

		return fileResponseDto;
	}
}
