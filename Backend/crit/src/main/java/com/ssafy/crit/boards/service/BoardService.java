package com.ssafy.crit.boards.service;

import static java.time.LocalDateTime.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import com.ssafy.crit.auth.entity.BaseTimeEntity;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.boards.entity.Classification;
import com.ssafy.crit.boards.entity.feeds.UploadFile;
import com.ssafy.crit.boards.repository.UploadFileRepository;
import com.ssafy.crit.boards.repository.ClassificationRepository;
import com.ssafy.crit.boards.service.dto.BoardResponseDto;
import com.ssafy.crit.boards.entity.board.Board;
import com.ssafy.crit.boards.repository.BoardRepository;

import com.ssafy.crit.boards.service.dto.BoardSaveRequestDto;
import com.ssafy.crit.boards.service.dto.BoardSaveResponseDto;
import com.ssafy.crit.boards.service.dto.BoardShowSortDto;
import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;
import com.ssafy.crit.common.global.BannedWords;
import com.ssafy.crit.common.global.Extention;
import com.ssafy.crit.common.s3.S3Uploader;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.processing.FilerException;

/**
 * author : 강민승
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final ClassificationRepository classificationRepository;
    private final S3Uploader s3Uploader;
    private final UploadFileRepository uploadFileRepository;
    private final BannedWords bannedWords;
    private final Extention fileExtentions;


    private static ArrayList<String> deleted = new ArrayList<>();

    //전체 게시물
    @Transactional(readOnly = true)
    public Page<BoardShowSortDto> getBoards(String category) {
        classificationRepository.findByCategory(category).orElseThrow(
                () -> {
                    return new BadRequestException(ErrorCode.NOT_EXISTS_BOARD_CATEGORY);
                });

        Pageable pageable = getPageable();
        Page<Board> boards = boardRepository.findAllByClassificationCategory(pageable, category);
        return getBoardShowSortDtos(boards);
    }

    @Transactional(readOnly = true)
    public Page<BoardShowSortDto> getWholeBoards() {
        Pageable pageable = getPageable();
        Page<Board> boards = boardRepository.findAll(pageable);
        return getBoardShowSortDtos(boards);
    }

    //개별 게시물 조회
    @Transactional
    public BoardResponseDto getBoard(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(() -> {
            return new BadRequestException(ErrorCode.NOT_EXISTS_BOARD_ID);
        });

        board.setViews(board.getViews() + 1);
        boardRepository.save(board);

        return BoardResponseDto.toDto(board);
    }

    public BoardSaveResponseDto write(List<MultipartFile> multipartFiles, BoardSaveRequestDto boardSaveRequestDto, User user)
            throws IOException {

        Classification classification = classificationRepository.findByCategory(boardSaveRequestDto.getClassification())
                .orElseGet(() -> {
                    Classification newClassification = new Classification();
                    newClassification.setCategory(boardSaveRequestDto.getClassification());
                    classificationRepository.save(newClassification);
                    return newClassification;
                });

        // 제목 작성이 없어도 임의의 제목을 넣어주기 위함.
        String title;

        if (boardSaveRequestDto.getTitle() != null) {
            title = boardSaveRequestDto.getTitle();
        } else {
        // System.out.println("타이틀 없으므로 Title로 대체");
            title = "Title";
        }

        if(bannedWords.isBannedWords(title)){
            throw new BadRequestException(ErrorCode.NOT_VALID_BOARD_TITLE);
        }

        Board board = Board.builder()
                .title(title)
                .content(boardSaveRequestDto.getContent())
                .classification(classification)
                .user(user)
                .build();

        boardRepository.save(board);

        // 다중 파일 보내기 위해 List 인스턴스 생성
        List<String> storeFileResult = new ArrayList<>();
        List<Long> fileId = new ArrayList<>();

        // Request 요청에 들어오는 값 중 multipartfile이 있다면
        if (multipartFiles != null) {
            for (MultipartFile multipartFile : multipartFiles) {
                String uploadFiles = s3Uploader.uploadFiles(multipartFile, "Boards");

                Boolean IsTrue = ImageExtention(uploadFiles);
                if (!IsTrue) {
                    throw new BadRequestException(ErrorCode.UNSUPPORTED_BOARD_MEDIA_TYPE);
                }

                UploadFile uploadFile = UploadFile.builder()
                        .board(board)
                        .userName(user.getId())
                        .storeFilePath(uploadFiles)
                        .classification(classification.getCategory())
                        .build();

                uploadFileRepository.saveAndFlush(uploadFile);
                storeFileResult.add(uploadFiles);
                fileId.add(uploadFile.getId());

            }
        }

        return BoardSaveResponseDto.builder()
                .id(board.getId())
                .title(title)
                .content(boardSaveRequestDto.getContent())
                .writer(user.getNickname())
                .classification(classification.getCategory())
                // date 가독성을 위해
                .createTime(now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-hh-mm-ss")))
                .modifyTime(now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-hh-mm-ss")))
                .imageFiles(storeFileResult)
                .fileId(fileId)
                .build();
    }


    public BoardResponseDto update(Long id, BoardResponseDto boardDto, List<MultipartFile> multipartFiles,
                                   User user) throws IOException {
        Board board = boardRepository.findById(id).orElseThrow(() -> {
            return new BadRequestException(ErrorCode.NOT_EXISTS_BOARD_ID);
        });


        if (!board.getUser().getId().equals(user.getId())) {
            throw new BadRequestException(ErrorCode.NOT_EXISTS_BOARD_AUTHORIZE);
        }
        List<UploadFile> uploadFile = uploadFileRepository.findAllByBoardsId(id);


        List<String> filenames = uploadFile.stream().distinct()
                .map(UploadFile::getStoreFilePath)
                .collect(Collectors.toList());

        List<String> storeFileResult = new ArrayList<>();

        List<String> itemsToRemove = new ArrayList<>();
        for (String s : filenames) {
            for (String s1 : deleted) {
                if (s.equals(s1)) {
                    uploadFileRepository.deleteByStorePath(s);
                    itemsToRemove.add(s);
                }
            }
        }

        filenames.removeAll(itemsToRemove);

        deleted = new ArrayList<>();


        storeFileResult.addAll(filenames);

        if (multipartFiles != null) {
            for (MultipartFile multipartFile : multipartFiles) {
                if (!multipartFile.isEmpty()) {
                    String uploadFiles = s3Uploader.uploadFiles(multipartFile, "Boards");

                    Boolean IsTrue = ImageExtention(uploadFiles);
                    if (!IsTrue) {
                        throw new BadRequestException(ErrorCode.UNSUPPORTED_BOARD_MEDIA_TYPE);
                    }

                    UploadFile uploadFileSave = UploadFile.builder()
                            .board(board)
                            .userName(user.getId())
                            .storeFilePath(uploadFiles)
                            .classification(board.getClassification().getCategory())
                            .build();
                    uploadFileRepository.save(uploadFileSave);
                    board.getUploadFiles().add(uploadFileSave);
                    storeFileResult.add(uploadFiles);
                }
            }
        }

        String title;

        if (boardDto.getTitle() != null) {
            title = boardDto.getTitle();
        } else {
            System.out.println("타이틀 없으므로 Title로 대체");
            title = "Title";
        }

        board.setUpdate(title, boardDto.getContent());

        if(bannedWords.isBannedWords(board.getTitle())){
            throw new BadRequestException(ErrorCode.NOT_VALID_BOARD_TITLE);
        }

        boardRepository.save(board);
        return BoardResponseDto.toDto(board);
    }

    public ArrayList<String> imageDelete(Long id, Long fileId) {
        Board board = boardRepository.findById(id).orElseThrow();

        if(!uploadFileRepository.findById(fileId).isPresent()) return null;

        List<UploadFile> allByBoardsId = uploadFileRepository.findAllByBoardsId(board.getId());
        for (UploadFile uploadFile : allByBoardsId) {
            if (uploadFile.getId().equals(fileId)) {
                deleted.add(uploadFile.getStoreFilePath());
            }
        }
        return deleted;
    }

    public void clearList() {
        deleted = new ArrayList<>();
    }

    // 게시글 삭제
    public void delete(Long id, User user) {
        // 매개변수 id를 기반으로, 게시글이 존재하는지 먼저 찾음
        // 게시글이 없으면 오류 처리
        Board board = boardRepository.findById(id).orElseThrow(() -> {
            return new BadRequestException(ErrorCode.NOT_EXISTS_BOARD_ID);
        });

        if (!board.getUser().getId().equals(user.getId())) {
            throw new BadRequestException(ErrorCode.NOT_EXISTS_BOARD_AUTHORIZE);
        }
        // 게시글이 있는 경우 삭제처리
        boardRepository.deleteById(id);
    }

    public Page<BoardShowSortDto> orderByViewsDesc(String category) {
        Pageable pageable = getPageable();
        Page<Board> boards = boardRepository.orderByViewsDesc(pageable, category);
        return getBoardShowSortDtos(boards);
    }

    public Page<BoardShowSortDto> orderByViewsAsc( String category) {
        Pageable pageable = getPageable();
        Page<Board> boards = boardRepository.orderByViewsAsc(pageable, category);
        return getBoardShowSortDtos(boards);
    }

    public Page<BoardShowSortDto> orderByLikesDesc(String category) {
        Pageable pageable = getPageable();
        Page<Board> boards = boardRepository.orderByLikesDesc(pageable, category);
        return getBoardShowSortDtos(boards);
    }

    public Page<BoardShowSortDto> orderByLikesAsc( String category) {
        Pageable pageable = getPageable();
        Page<Board> boards = boardRepository.orderByLikesAsc(pageable, category);
        return getBoardShowSortDtos(boards);
    }

    public Page<BoardShowSortDto> findByTitleContaining(String find, String category) {
        Pageable pageable = getPageable();
        Page<Board> boards = boardRepository.findByTitleContaining(find,category, pageable);
        return getBoardShowSortDtos(boards);
    }

    public Page<BoardShowSortDto> findAllByUserAndClassification(User user, String classificationString,
                                                                 Pageable pageable) {

        Classification classification = classificationRepository.findByCategory(classificationString)
                .orElseThrow(() -> {
                    return new BadRequestException(ErrorCode.NOT_EXISTS_BOARD_CATEGORY);
                });

        Page<Board> boards = boardRepository.findAllByUserAndClassification(user, classification, pageable);
        return getBoardShowSortDtos(boards);
    }

    public Page<BoardShowSortDto> findAllByUser(User user) {
        Pageable pageable = getPageable();
        Page<Board> boards = boardRepository.findAllByUser(user, pageable);
        return getBoardShowSortDtos(boards);
    }

    @Transactional(readOnly = true)
    public List<BoardShowSortDto> getWholeChallengeBoards(String s) {
        List<Board> boards = boardRepository.findAllByCategory(s);

        List<BoardShowSortDto> bt = new ArrayList<>();

        for (Board board : boards) {
            List<String> likedName = board.getLikes().stream()
                    .map(like -> like.getUser().getNickname())
                    .collect(Collectors.toList());

            List<String> filenames = board.getUploadFiles().stream()
                    .map(UploadFile::getStoreFilePath)
                    .collect(Collectors.toList());

            BoardShowSortDto build = BoardShowSortDto.builder()
                    .id(board.getId())
                    .title(board.getTitle())
                    .content(board.getContent())
                    .views(board.getViews())
                    .writer(board.getUser().getNickname())
                    .likesCount(board.getLikes().size())
                    .classification(board.getClassification().getCategory())
                    .liked(likedName)
                    .imageUrl(filenames)
                    .createTime(board.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-hh-mm-ss")))
                    .modifyTime(board.getModifiedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-hh-mm-ss")))
                    .build();

            bt.add(build);
        }
        return bt;
    }

    private Page<BoardShowSortDto> getBoardShowSortDtos(Page<Board> boards) {
        return boards.map(board -> {
            if (board.getUser() == null) {
                throw new RuntimeException("User is null for board id: " + board.getId());
            }

            List<String> likedName = board.getLikes().stream()
                    .map(like -> like.getUser().getNickname())
                    .collect(Collectors.toList());

            List<String> filenames = board.getUploadFiles().stream()
                    .map(UploadFile::getStoreFilePath)
                    .collect(Collectors.toList());

            List<Long> fileId = board.getUploadFiles().stream()
                    .map(UploadFile::getId)
                    .collect(Collectors.toList());

            return new BoardShowSortDto(board.getId(),
                    board.getTitle(),
                    board.getContent(),
                    board.getViews(),
                    board.getUser().getNickname(),
                    board.getLikes().size(),
                    board.getClassification().getCategory(),
                    likedName, filenames, fileId,
                    board.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-hh-mm-ss")),
                    board.getModifiedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-hh-mm-ss")));
        });
    }

    private boolean ImageExtention(String uploadFiles) {
        String extension = getString(uploadFiles);

        return fileExtentions.isImageExtension(extension);
    }

    private boolean AviExtention(String uploadFiles) {
        String extension = getString(uploadFiles);

        return fileExtentions.isAviExtension(extension);
    }

    private static String getString(String uploadFiles) {
        String[] split = uploadFiles.split("\\.");
        String extension = split[split.length - 1];
        return extension;
    }

    private static Pageable getPageable() {
        Pageable pageable = PageRequest.of(0, 20, Sort.by("id").descending());
        return pageable;
    }
}
