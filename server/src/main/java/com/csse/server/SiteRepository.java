package com.csse.server;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.csse.server.model.Site;

public interface SiteRepository extends MongoRepository<Site, String> {

}
