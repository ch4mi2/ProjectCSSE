package com.csse.server.service;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;

public interface RemovePolicy {
    public boolean removePolicy(ObjectId id, MongoTemplate mongoTemplate);
}
