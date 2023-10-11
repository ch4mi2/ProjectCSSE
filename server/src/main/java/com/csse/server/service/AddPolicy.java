package com.csse.server.service;

import org.bson.types.ObjectId;

public interface AddPolicy {
    public void recordPolicy(ObjectId id, float amount);
}
