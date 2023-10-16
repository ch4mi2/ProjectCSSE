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
    public boolean addPolicy(ObjectId id, float amount, @NotNull MongoTemplate mongoTemplate) {
        Item item = mongoTemplate.findById(id, Item.class, "items");
        if( item != null ) {
            (item).setRestricted(true);
            (item).setRestrictedAmount(amount);
            item = mongoTemplate.save(item, "items");
            if( item != null ) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new CreatedItemNotFoundException("The item the policy was created on could not be found");
        }
    }

    @Override
    public boolean removePolicy(ObjectId id, MongoTemplate mongoTemplate) {
        Item item = mongoTemplate.findById(id, Item.class, "items");
        if( item != null ) {
            item.setRestricted(false);
            item.setRestrictedAmount(0);
            item = mongoTemplate.save(item, "items");
            if( item != null ) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new CreatedItemNotFoundException("The item the policy was created on could not be found");
        }
    }

    @Override
    public boolean updatePolicy(ObjectId id, float amount, MongoTemplate mongoTemplate) {
        Item item = mongoTemplate.findById(id, Item.class, "items");
        if( item != null ) {
            item.setRestrictedAmount(amount);
            item = mongoTemplate.save(item, "items");
            if( item != null ) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new CreatedItemNotFoundException("The item the policy was created on could not be found");
        }
    }
}
