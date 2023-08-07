package com.example.springexceptionhandling.error.exception;

import com.example.springexceptionhandling.error.ErrorCode;
import lombok.Getter;

@Getter
public class AuthenticationException extends RuntimeException{
    private ErrorCode errorCode;

    public AuthenticationException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
