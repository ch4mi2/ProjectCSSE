package com.csse.server.exception;

public class CreatedSiteNotFoundException extends RuntimeException{
    private String message;

    public CreatedSiteNotFoundException() {}

    public CreatedSiteNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}
