package com.csse.server.model;

import com.csse.server.states.OrderState;
import com.csse.server.states.PendingState;

public class Order {
    private OrderState state;
    //other attributes


    public Order() {
        state = new PendingState();
    }

    public String getState() {
        return state.getState();
    }

    public void setState(OrderState state) {
        this.state = state;
    }
}
