package com.csse.server.controller;

import com.csse.server.SiteRepository;
import com.csse.server.model.Site;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;



@RestController
public class SiteController {
    
    @Autowired
    SiteRepository repo;

    @GetMapping("/getAllSites")
    public List<Site> getAllSites(){
        System.out.println("GET all Sites");
        return repo.findAll();

    }
}
