package com.csse.server.states;

public class DeliveringState implements OrderState{
    @Override
    public String getState() {
        return "delivering";
    }
}