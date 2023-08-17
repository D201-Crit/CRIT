// package com.ssafy.crit.shorts.test;
//
// import java.util.Random;
//
// import javax.transaction.Transactional;
//
// import org.springframework.boot.context.event.ApplicationReadyEvent;
// import org.springframework.context.event.EventListener;
// import org.springframework.stereotype.Component;
//
// import com.ssafy.crit.auth.entity.User;
// import com.ssafy.crit.auth.entity.enumType.AuthProvider;
// import com.ssafy.crit.auth.entity.enumType.Grade;
// import com.ssafy.crit.auth.entity.enumType.Role;
// import com.ssafy.crit.auth.repository.UserRepository;
// import com.ssafy.crit.boards.entity.Classification;
// import com.ssafy.crit.boards.entity.board.Board;
// import com.ssafy.crit.boards.repository.BoardRepository;
// import com.ssafy.crit.boards.repository.ClassificationRepository;
//
// import lombok.RequiredArgsConstructor;
//
// @Component
// @RequiredArgsConstructor
// public class BoardData {
//
// 	private final BoardRepository boardRepository;
// 	private final ClassificationRepository classificationRepository;
// 	private final UserRepository userRepository;
// 	private final Random random = new Random();
//
// 	@EventListener(ApplicationReadyEvent.class)
// 	@Transactional
// 	public void initDB() {
// 		createCategory();
//
// 		createBoards("반려동물 게시판", 100);
// 		createBoards("자유 게시판", 100);
// 		createBoards("자랑게시판", 100);
// 		createBoards("운동 게시판", 100);
// 	}
//
//
// 	private void createCategory() {
// 		saveCategory("반려동물 게시판");
// 		saveCategory("자랑게시판");
// 		saveCategory("자유 게시판");
// 		saveCategory("운동 게시판");
// 	}
//
// 	private void saveCategory(String categoryName) {
// 		if (!classificationRepository.findByCategory(categoryName).isPresent()) {
// 			Classification classification = Classification.builder()
// 				.category(categoryName)
// 				.build();
// 			classificationRepository.save(classification);
// 		}
// 	}
//
// 	private String generateRandomTitle() {
// 		String[] titles = {
// 			"오늘", "공통프로젝ㅌ", "발표", "제목", "빵빵아"
//
// 		};
// 		return titles[random.nextInt(titles.length)];
// 	}
//
// 	private String generateRandomContent() {
// 		String[] contents = {
// 			"고기만두", "감칠맛 진한 김치찌개", "오늘 지나면 주말", "아이좋아", "너무좋아"
//
// 		};
// 		return contents[random.nextInt(contents.length)];
// 	}
//
// 	private int generateRandomViews() {
// 		return random.nextInt(1000);
// 	}
//
// 	private User createUser() {
//
// 		 User user = User.builder()
// 			.id("user" + String.valueOf(999))
// 			.nickname("관리자1")
// 			.password("user" + String.valueOf(999) + "user" + String.valueOf(999))
// 			.email("user" + String.valueOf(999) + "@naver.com")
// 			.grade(Grade.Beginner)
// 			.authProvider(AuthProvider.EMPTY)
// 			.exp(0)
// 			.role(Role.USER)
// 			.cashPoint(0)
// 			.build();
//
// 		return userRepository.saveAndFlush(user);
// 	}
//
// 	private void createBoards(String category, int count) {
// 		Classification classification = classificationRepository.findByCategory(category).get();
// 		for (int i = 0; i < count; i++) {
// 			Board board = Board.builder()
// 				.title(generateRandomTitle())
// 				.content(generateRandomContent())
// 				.views(generateRandomViews())
// 				.classification(classification)
// 				.user(createUser())
// 				.build();
//
// 			boardRepository.save(board);
// 		}
// 	}
// }