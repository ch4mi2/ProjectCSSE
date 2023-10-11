package com.csse.server.service;
import com.csse.server.model.Item;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class ItemPolicy implements AddPolicy, RemovePolicy {

    @Override
    public void addPolicy(ObjectId id, float amount,  MongoTemplate mongoTemplate) {
        Item item = mongoTemplate.findById(id, Item.class, "items");
        Objects.requireNonNull(item).setRestricted(true);
        mongoTemplate.save(item, "items");
    }

    @Override
    public void removePolicy(ObjectId id, MongoTemplate mongoTemplate) {
        Item item = mongoTemplate.findById(id, Item.class, "items");
        Objects.requireNonNull(item).setRestricted(false);
        mongoTemplate.save(item, "items");
    }
}
