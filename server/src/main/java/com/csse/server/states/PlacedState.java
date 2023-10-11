package com.csse.server.states;

public class PlacedState implements OrderState{
    @Override
    public String getState() {
        return "Placed";
    }
}
