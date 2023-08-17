package com.ssafy.crit.shorts.test;

import javax.transaction.Transactional;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.ssafy.crit.auth.entity.Follow;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.entity.enumType.AuthProvider;
import com.ssafy.crit.auth.entity.enumType.Grade;
import com.ssafy.crit.auth.entity.enumType.Role;
import com.ssafy.crit.auth.repository.FollowRepository;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FollowData {

	private final UserRepository userRepository;
	private final FollowRepository followRepository;
	@EventListener(ApplicationReadyEvent.class)
	@Transactional
	public void initDB() {
		createFollow();

	}


	private void createFollow() {

		User me = userRepository.findByNickname("오함마").orElseThrow(() -> {
			return new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
		});

		for(int i=0; i<315; i++) {

			User user = userRepository.findByNickname("user" + String.valueOf(i)).orElseThrow(() -> {
				return new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
			});

			Follow follow = Follow.builder()
				.follower(me)
				.following(user)
				.build();

			followRepository.save(follow);
		}

		for(int i=0; i<487; i++) {

			User user = userRepository.findByNickname("user" + String.valueOf(i)).orElseThrow(() -> {
				return new BadRequestException(ErrorCode.ALREADY_REGISTERED_BOARD_DATA);
			});

			Follow follow = Follow.builder()
				.follower(user)
				.following(me)
				.build();

			followRepository.save(follow);
		}
	}

	// private User createUser() {
	//
	// 	User user = User.builder()
	// 		.id("user" + String.valueOf(999))
	// 		.nickname("Ohamma")
	// 		.password("123123")
	// 		.email("user" + String.valueOf(999) + "@naver.com")
	// 		.grade(Grade.IntermediateHigh)
	// 		.authProvider(AuthProvider.EMPTY)
	// 		.exp(846)
	// 		.role(Role.USER)
	// 		.cashPoint(48500)
	// 		.build();
	//
	// 	return userRepository.saveAndFlush(user);
	// }
}
