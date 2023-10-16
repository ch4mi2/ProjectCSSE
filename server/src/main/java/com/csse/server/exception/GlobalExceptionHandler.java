package com.csse.server.exception;

import com.csse.server.utils.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(PolicyNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public  @ResponseBody ErrorResponse handleNoSuchPolicyFoundException(PolicyNotFoundException exception) {
        System.out.println(exception.getMessage());
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }
    @ExceptionHandler(CreatedItemNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody ErrorResponse handleNoRelatedItemFoundException(CreatedItemNotFoundException exception) {
        System.out.println(exception.getMessage());
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }

    @ExceptionHandler(CreatedSiteNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody ErrorResponse handleNoRelatedSiteFoundException(CreatedSiteNotFoundException exception) {
        System.out.println(exception.getMessage());
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }

    @ExceptionHandler(InvalidFormatException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody ErrorResponse handleInvalidFormatException(InvalidFormatException exception) {
        System.out.println(exception.getMessage());
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
    }
}
