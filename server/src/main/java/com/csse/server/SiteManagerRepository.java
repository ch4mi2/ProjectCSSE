package com.csse.server;


import com.csse.server.model.SiteManager;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SiteManagerRepository extends MongoRepository<SiteManager, String> {

}
