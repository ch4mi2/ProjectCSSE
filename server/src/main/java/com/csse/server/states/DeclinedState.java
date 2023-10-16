/*
Description: concrete state, state design pattern
 */
package com.csse.server.states;

public class DeclinedState implements  OrderState{
    @Override
    public String getState() {
        return "Declined";
    }
}
