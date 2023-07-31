package com.ssafy.crit.message.controller;


import javax.servlet.http.HttpServletRequest;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.message.dto.MessageDto;
import com.ssafy.crit.message.response.Response;
import com.ssafy.crit.message.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class MessageController {

	private final MessageService messageService;
	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;

	@PostMapping("/messages")
	public Response<?> sendMessage(@RequestBody MessageDto messageDto, HttpServletRequest httpServletRequest) {
		// 임의로 유저 정보를 넣었지만, JWT 도입하고 현재 로그인 된 유저의 정보를 넘겨줘야함


		User sender = userRepository.findById(getUser(httpServletRequest).getId()).orElseThrow(() -> {
			return new IllegalArgumentException("유저를 찾을 수 없습니다.");
		});
		User receiver = userRepository.findById(messageDto.getReceiverName()).get();

		return new Response<>("성공", "쪽지를 보냈습니다.", messageService.write(messageDto));
	}


	@GetMapping("/messages/received")
	public Response<?> getReceivedMessage( HttpServletRequest httpServletRequest) {

		User user = userRepository.findById(getUser(httpServletRequest).getId()).orElseThrow(() -> {
			return new IllegalArgumentException("유저를 찾을 수 없습니다.");
		});

		return new Response("성공", "받은 쪽지를 불러왔습니다.", messageService.receivedMessage(user));
	}


	@DeleteMapping("/messages/received/{id}")
	public Response<?> deleteReceivedMessage(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
		// 임의로 유저 정보를 넣었지만, JWT 도입하고 현재 로그인 된 유저의 정보를 넘겨줘야함
		User user = userRepository.findById(getUser(httpServletRequest).getId()).orElseThrow(() -> {
			return new IllegalArgumentException("유저를 찾을 수 없습니다.");
		});

		return new Response<>("삭제 성공", "받은 쪽지인, " + id + "번 쪽지를 삭제했습니다.", messageService.deleteMessageByReceiver(id, user));
	}


	@GetMapping("/messages/sent")
	public Response<?> getSentMessage(HttpServletRequest httpServletRequest) {
		// 임의로 유저 정보를 넣었지만, JWT 도입하고 현재 로그인 된 유저의 정보를 넘겨줘야함
		User user = userRepository.findById(getUser(httpServletRequest).getId()).orElseThrow(() -> {
			return new IllegalArgumentException("유저를 찾을 수 없습니다.");
		});

		return new Response("성공", "보낸 쪽지를 불러왔습니다.", messageService.sentMessage(user));
	}


	@DeleteMapping("/messages/sent/{id}")
	public Response<?> deleteSentMessage(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
		// 임의로 유저 정보를 넣었지만, JWT 도입하고 현재 로그인 된 유저의 정보를 넘겨줘야함
		User user = userRepository.findById(getUser(httpServletRequest).getId()).orElseThrow(() -> {
			return new IllegalArgumentException("유저를 찾을 수 없습니다.");
		});

		return new Response<>("삭제 성공", "보낸 쪽지인, " + id + "번 쪽지를 삭제했습니다.", messageService.deleteMessageBySender(id, user));
	}


	private User getUser(HttpServletRequest httpServletRequest) {
		String header = httpServletRequest.getHeader("Authorization");
		String bearer = header.substring(7);
		String userId = (String) jwtProvider.get(bearer).get("userId");

		User user = userRepository.findById(userId).orElseThrow(() -> {
			return new IllegalArgumentException("유저 ID를 찾을수 없습니다.");
		});
		return user;
	}

}
