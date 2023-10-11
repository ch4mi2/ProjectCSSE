package com.csse.server.repository;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.csse.server.model.Site;

public interface SiteRepository extends MongoRepository<Site, ObjectId> {

}
