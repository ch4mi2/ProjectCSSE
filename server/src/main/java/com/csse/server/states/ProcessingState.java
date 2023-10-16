/*
Description: concrete state, state design pattern
 */
package com.csse.server.states;

public class ProcessingState implements OrderState{
    @Override
    public String getState() {
        return "processing";
    }
}
