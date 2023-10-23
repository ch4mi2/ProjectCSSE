package com.csse.server.service;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;

/**
 * interface which is used by child classes to implement updatePolicy method
 */
public interface UpdatePolicy {
    public boolean updatePolicy(ObjectId id, float amount, MongoTemplate mongoTemplate);
}
