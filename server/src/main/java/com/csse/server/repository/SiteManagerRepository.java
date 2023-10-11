package com.csse.server.repository;


import com.csse.server.model.SiteManager;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SiteManagerRepository extends MongoRepository<SiteManager, ObjectId> {

}
