package com.csse.server.service;

import com.csse.server.exception.CreatedItemNotFoundException;
import com.csse.server.model.Item;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class ItemPolicy implements AddPolicy, RemovePolicy, UpdatePolicy {

    @Override
    public void addPolicy(ObjectId id, float amount, @NotNull MongoTemplate mongoTemplate) {
        Item item = mongoTemplate.findById(id, Item.class, "items");
        if( item != null ) {
            (item).setRestricted(true);
            (item).setRestrictedAmount(amount);
            mongoTemplate.save(item, "items");
        } else {
            throw new CreatedItemNotFoundException("The item the policy was created on could not be found");
        }
    }

    @Override
    public void removePolicy(ObjectId id, MongoTemplate mongoTemplate) {
        Item item = mongoTemplate.findById(id, Item.class, "items");
        if( item != null ) {
            item.setRestricted(false);
            mongoTemplate.save(item, "items");
        } else {
            throw new CreatedItemNotFoundException("The item the policy was created on could not be found");
        }
    }

    @Override
    public void updatePolicy(ObjectId id, float amount, MongoTemplate mongoTemplate) {
        Item item = mongoTemplate.findById(id, Item.class, "items");
        if( item != null ) {
            item.setRestrictedAmount(amount);
            mongoTemplate.save(item, "items");
        } else {
            throw new CreatedItemNotFoundException("The item the policy was created on could not be found");
        }
    }
}
