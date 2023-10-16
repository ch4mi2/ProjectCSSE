/*
Description: concrete state, state design pattern
 */
package com.csse.server.states;

public class CompleteState implements OrderState{

    @Override
    public String getState() {
        return "Complete";
    }
}
