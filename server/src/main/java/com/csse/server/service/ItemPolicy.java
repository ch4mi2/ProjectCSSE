package com.csse.server.service;

import com.csse.server.exception.CreatedItemNotFoundException;
import com.csse.server.model.Item;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

/**
 * Item policy class which implements methods needed to reflect changes in items according to the policy created
 */
@Service
public class ItemPolicy implements AddPolicy, RemovePolicy, UpdatePolicy {

    /**
     * Fired when a new policy is created to reflect changes in the database
     * @param id
     * @param amount
     * @param mongoTemplate
     * @return
     */
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

    /**
     * Fired when a policy is deleted to reflect changes on the database
     * @param id
     * @param mongoTemplate
     * @return
     */
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

    /**
     * Fired when a policy is updated to reflect changes on the database
     * @param id
     * @param amount
     * @param mongoTemplate
     * @return
     */
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
