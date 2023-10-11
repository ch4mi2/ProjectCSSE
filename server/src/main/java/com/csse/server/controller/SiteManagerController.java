package com.csse.server.controller;

import com.csse.server.model.SiteManager;
import com.csse.server.repository.SiteManagerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;



@RestController
public class SiteManagerController {
    
    @Autowired
    SiteManagerRepository repo;

    @GetMapping("/getAllSiteManagers")
    public List<SiteManager> getAllSites(){
        System.out.println("GET all Sites");
        return repo.findAll();

    }
}
