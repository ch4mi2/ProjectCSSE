package com.csse.server.exception;

public class InvalidFormatException extends RuntimeException{
    private String message;

    public InvalidFormatException() {}

    public InvalidFormatException(String message) {
        super(message);
        this.message = message;
    }
}
