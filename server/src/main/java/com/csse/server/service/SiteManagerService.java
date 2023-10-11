package com.csse.server.service;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.csse.server.model.SiteManager;
import com.csse.server.repository.SiteManagerRepository;

@Service
public class SiteManagerService {
    @Autowired
    private SiteManagerRepository siteManagerRepository;

    public SiteManagerService() {
    }
    
    public List<SiteManager> allSiteManagers() {
        return siteManagerRepository.findAll();
    }

    public Optional<SiteManager> singleSiteManager(ObjectId id) {
        return siteManagerRepository.findById(id);
    }

    public SiteManager addSiteManager(SiteManager payload) {
        return siteManagerRepository.insert(payload);
    }
}
