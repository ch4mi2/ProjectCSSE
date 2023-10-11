package com.csse.server.states;

public class PendingState implements OrderState{
    @Override
    public String getState() {
        return "Pending";
    }
}
