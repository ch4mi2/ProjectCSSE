package com.csse.server.exception;

public class CreatedItemNotFoundException extends RuntimeException{
    private String message;

    public CreatedItemNotFoundException() {}

    public CreatedItemNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}

