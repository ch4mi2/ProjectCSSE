package com.csse.server.model;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Document(collection = "sites")
public class Site {
    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;
    private String name;
    private String address;
    private double orderLimit;
    private String siteManager;

//    public Site(String name, String address, double orderLimit, String siteManager) {
//        this.name = name;
//        this.address = address;
//        this.orderLimit = orderLimit;
//        this.siteManager = siteManager;
//    }
    

    // setters
    public void setName(String name) {
        this.name = name;
    }

    public void setOrderLimit(double orderLimit) {
        this.orderLimit = orderLimit;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setSiteManager(String siteManager) {
        this.siteManager = siteManager;
    }

    // getters
    public ObjectId getId() { return id; }
    public String getName() {
        return name;
    }

    public double getOrderLimit() {
        return orderLimit;
    }

    public String getAddress() {
        return address;
    }

    public String getSiteManager() {
        return siteManager;
    }


}
