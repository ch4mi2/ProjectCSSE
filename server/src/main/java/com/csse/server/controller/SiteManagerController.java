package com.csse.server.controller;
import com.csse.server.model.SiteManager;
import com.csse.server.service.SiteManagerService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/siteManagers/")
public class SiteManagerController {
    
    @Autowired
    SiteManagerService siteManagerService;

   @GetMapping
   public ResponseEntity<List<SiteManager>> getSiteManagers() {
         System.out.println("Get all Site Managers");
         return new ResponseEntity<List<SiteManager>>(siteManagerService.allSiteManagers(), HttpStatus.OK);
   }

   @GetMapping("/{id}")
    public ResponseEntity<Optional<SiteManager>> getSingleSiteManager(@PathVariable ObjectId id) {
            System.out.println("Get single Site Manager");
            return new ResponseEntity<Optional<SiteManager>>(siteManagerService.singleSiteManager(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SiteManager> createSiteManager(@RequestBody SiteManager sm){
        return new ResponseEntity<SiteManager>(siteManagerService.addSiteManager(sm), HttpStatusCode.valueOf(201));
    }
}
