package com.ssafy.crit.common.error.exception;

import com.ssafy.crit.common.error.code.ErrorCode;
import lombok.Getter;

@Getter
public class AuthenticationException extends RuntimeException{
    private ErrorCode errorCode;

    public AuthenticationException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
