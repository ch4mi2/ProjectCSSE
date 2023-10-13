package com.csse.server.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csse.server.model.Site;
import com.csse.server.model.SiteManager;
import com.csse.server.repository.SiteRepository;

@Service
public class SiteService {
    @Autowired
    private SiteRepository siteRepository;
    
    public SiteService() {
    }

    public List<Site> allSites() {
        return siteRepository.findAll();
    }

    public Optional<Site> singleSite(ObjectId id) {
        return siteRepository.findById(id);
    }

   
    public Site createSite(Site payload) {
        return siteRepository.insert(payload);
    }

}
