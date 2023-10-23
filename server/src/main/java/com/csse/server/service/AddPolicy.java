package com.csse.server.service;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;

/**
 * Interface which is used by child classes to implement add policy method
 */
public interface AddPolicy {
    public boolean addPolicy(ObjectId id, float amount, MongoTemplate mongoTemplate);
}
