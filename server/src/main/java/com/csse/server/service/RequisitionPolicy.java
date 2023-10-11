package com.csse.server.service;

import com.csse.server.model.Site;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Objects;

public class RequisitionPolicy implements AddPolicy, RemovePolicy {

    @Override
    public void addPolicy(ObjectId id, float amount, @NotNull MongoTemplate mongoTemplate) {
        Site site = mongoTemplate.findById(id, Site.class, "sites");
        Objects.requireNonNull(site).setOrderLimit(amount);
        mongoTemplate.save(site, "sites");
    }

    @Override
    public void removePolicy(ObjectId id, MongoTemplate mongoTemplate) {
        Site site = mongoTemplate.findById(id, Site.class, "sites");
        Objects.requireNonNull(site).setOrderLimit(0);
        mongoTemplate.save(site, "sites");
    }
}
