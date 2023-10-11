package com.csse.server.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection = "sites")
public class Site {
    @Id
    private ObjectId id;

    private String name;
    private String address;
    private float orderLimit;
    
    @DBRef
    private SiteManager siteManager;

    public Site(String name, String address, float orderLimit, SiteManager siteManager) {
        this.name = name;
        this.address = address;
        this.orderLimit = orderLimit;
        this.siteManager = siteManager;
    }
    

    // setters
    public void setName(String name) {
        this.name = name;
    }

    public void setOrderLimit(float orderLimit) {
        this.orderLimit = orderLimit;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setSiteManager(SiteManager siteManager) {
        this.siteManager = siteManager;
    }

    // getters
    public String getName() {
        return name;
    }

    public float getOrderLimit() {
        return orderLimit;
    }

    public String getAddress() {
        return address;
    }

    public SiteManager getSiteManager() {
        return siteManager;
    }


}
