package com.csse.server.controller;
import com.csse.server.model.Site;
import com.csse.server.service.SiteService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/sites/")
public class SiteController {
    
    @Autowired
    private SiteService service;

    @GetMapping
    public ResponseEntity<List<Site>> getAllSites() {
        System.out.println("Get all Sites");
        return new ResponseEntity<List<Site>>(service.allSites(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Site>> getSingleSite(@PathVariable ObjectId id){
        System.out.println("Get single Site");
        return new ResponseEntity<Optional<Site>>(service.singleSite(id), HttpStatus.OK);
    }

    @PostMapping("/item")
    public ResponseEntity<Site> newSite(@RequestBody Site payload){
        return new ResponseEntity<Site>(service.createSite(payload), HttpStatusCode.valueOf(201));
    }
}
