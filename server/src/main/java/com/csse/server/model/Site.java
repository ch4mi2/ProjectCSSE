package com.csse.server.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sites")
public class Site {
    private String name;
    private String address;
    private float orderLimit;
    private String siteManager;

    public Site() {
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

    public void setSiteManager(String siteManager) {
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

    public String getSiteManager() {
        return siteManager;
    }


}
