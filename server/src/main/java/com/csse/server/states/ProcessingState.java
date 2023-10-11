package com.csse.server.states;

public class ProcessingState implements OrderState{
    @Override
    public String getState() {
        return "processing";
    }
}
