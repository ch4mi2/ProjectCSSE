package com.csse.server.service;

import com.csse.server.exception.CreatedSiteNotFoundException;
import com.csse.server.model.Site;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * Requisition policy class which implements methods needed to reflect changes in sites according to the policy created
 */
@Service
public class RequisitionPolicy implements AddPolicy, RemovePolicy, UpdatePolicy{

    /**
     * Fired when a policy is created on a site
     * @param id
     * @param amount
     * @param mongoTemplate
     * @return
     */
    @Override
    public boolean addPolicy(ObjectId id, float amount, @NotNull MongoTemplate mongoTemplate) {
        Site site = mongoTemplate.findById(id, Site.class, "sites");
        if (site != null) {
            Objects.requireNonNull(site).setOrderLimit(amount);
            site = mongoTemplate.save(site, "sites");
            if (site != null) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new CreatedSiteNotFoundException("The construction site the policy was created on could not be found");
        }

    }

    /**
     * Fired when a policy created on a site is deleted
     * @param id
     * @param mongoTemplate
     * @return
     */
    @Override
    public boolean removePolicy(ObjectId id, @NotNull MongoTemplate mongoTemplate) {
        Site site = mongoTemplate.findById(id, Site.class, "sites");
        if (site!= null) {
            Objects.requireNonNull(site).setOrderLimit(0);
            site = mongoTemplate.save(site, "sites");
            if (site != null) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new CreatedSiteNotFoundException("The construction site the policy was created on could not be found");
        }
    }

    /**
     * Fired when a policy created on a site is updated in a way it needs to be reflected by the site collection
     * @param id
     * @param amount
     * @param mongoTemplate
     * @return
     */
    @Override
    public boolean updatePolicy(ObjectId id, float amount, @NotNull MongoTemplate mongoTemplate) {
        Site site = mongoTemplate.findById(id, Site.class, "sites");
        if (site != null) {
            Objects.requireNonNull(site).setOrderLimit(amount);
            site = mongoTemplate.save(site, "sites");
            if (site != null) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new CreatedSiteNotFoundException("The construction site the policy was created on could not be found");
        }
    }
}
