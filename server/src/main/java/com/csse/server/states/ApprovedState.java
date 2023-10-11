package com.csse.server.states;

public class ApprovedState implements OrderState{
    @Override
    public String getState() {
        return "Complete";
    }
}
