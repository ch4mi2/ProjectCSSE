package com.csse.server.service;

import com.csse.server.exception.CreatedSiteNotFoundException;
import com.csse.server.model.Site;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Objects;
@Service
public class RequisitionPolicy implements AddPolicy, RemovePolicy, UpdatePolicy{

    @Override
    public void addPolicy(ObjectId id, float amount, @NotNull MongoTemplate mongoTemplate) {
        Site site = mongoTemplate.findById(id, Site.class, "sites");
        if (site != null) {
            Objects.requireNonNull(site).setOrderLimit(amount);
            mongoTemplate.save(site, "sites");
        } else {
            throw new CreatedSiteNotFoundException("The construction site the policy was created on could not be found");
        }

    }

    @Override
    public void removePolicy(ObjectId id, @NotNull MongoTemplate mongoTemplate) {
        Site site = mongoTemplate.findById(id, Site.class, "sites");
        Objects.requireNonNull(site).setOrderLimit(0);
        mongoTemplate.save(site, "sites");
    }

    @Override
    public void updatePolicy(ObjectId id, float amount, @NotNull MongoTemplate mongoTemplate) {
        Site site = mongoTemplate.findById(id, Site.class, "sites");
        Objects.requireNonNull(site).setOrderLimit(amount);
        mongoTemplate.save(site, "sites");
    }
}
