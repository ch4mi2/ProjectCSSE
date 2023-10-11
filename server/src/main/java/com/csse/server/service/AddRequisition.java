package com.csse.server.service;

import org.bson.types.ObjectId;

public class AddRequisition implements AddPolicy{

    @Override
    public void reflectPolicy(ObjectId id, float amount) {
        System.out.println("Fires Site");
    }
}
