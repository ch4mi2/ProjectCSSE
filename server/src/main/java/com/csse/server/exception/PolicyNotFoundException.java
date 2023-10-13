package com.csse.server.exception;

public class PolicyNotFoundException extends RuntimeException{
    private String message;

    public PolicyNotFoundException() {}

    public PolicyNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}