package com.csse.server.service;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;

/**
 *
 * Interface which is used by child classes to implement remove policy method
 */
public interface RemovePolicy {
    public boolean removePolicy(ObjectId id, MongoTemplate mongoTemplate);
}
