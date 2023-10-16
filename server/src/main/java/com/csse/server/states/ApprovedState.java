/*
Description: concrete state, state design pattern
 */
package com.csse.server.states;

public class ApprovedState implements OrderState{
    @Override
    public String getState() {
        return "Approved";
    }
}
