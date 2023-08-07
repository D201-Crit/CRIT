package message.message.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import message.message.response.Response;

@RestControllerAdvice
public class ExceptionAdvice {
	@ExceptionHandler(IllegalArgumentException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public Response<?> illegalArgumentExceptionAdvice(IllegalArgumentException e) {
		return new Response("fail", e.getMessage().toString(), null);
	}

}