// package com.ssafy.crit.shorts.test;
//
// import javax.annotation.PostConstruct;
// import javax.transaction.Transactional;
//
// import org.springframework.boot.context.event.ApplicationReadyEvent;
// import org.springframework.context.event.EventListener;
// import org.springframework.stereotype.Component;
//
// import com.drew.metadata.StringValue;
// import com.ssafy.crit.auth.entity.User;
// import com.ssafy.crit.auth.entity.enumType.AuthProvider;
// import com.ssafy.crit.auth.entity.enumType.Grade;
// import com.ssafy.crit.auth.entity.enumType.Role;
// import com.ssafy.crit.auth.repository.UserRepository;
//
// import lombok.RequiredArgsConstructor;
//
// @Component
// @RequiredArgsConstructor
// public class UserInitData {
// 	private final UserRepository userRepository;
//
// 	@EventListener(ApplicationReadyEvent.class)
// 	@Transactional
// 	public void initDB(){
// 		initTestMember();
// 	}
//
// 	public void initTestMember() {
//
// 		for(int i=0; i< 500; i++){
// 			User user = User.builder()
// 				.id("user" + String.valueOf(i))
// 				.nickname("user" + String.valueOf(i))
// 				.password("user" + String.valueOf(i) + "user" + String.valueOf(i))
// 				.email("user" + String.valueOf(i) + "@naver.com")
// 				.grade(Grade.Beginner)
// 				.authProvider(AuthProvider.EMPTY)
// 				.exp(0)
// 				.role(Role.USER)
// 				.cashPoint(0)
// 				.build();
//
// 			userRepository.save(user);
// 		}
// 	}
// }
