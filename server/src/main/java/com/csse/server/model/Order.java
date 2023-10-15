package com.csse.server.model;
import java.util.Map;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orders")
public class Order {
    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;
    private String state;
    private double total;
    private Map<String, String> site;
    private Map<String, Integer> items;
    private String siteManager;
    private boolean draft;
    private String comments;

    public Order(Map<String, Integer> items, double total, Map<String,String> site, String siteManager, String comments, boolean draft) {
        this.comments = comments;
        this.draft = draft;
        this.total = total;
        this.site = site;
        this.siteManager = siteManager;
        this.items = items;
        state = "pending";
    }

    public String getComments() {
        return comments;
    }

    public boolean isDraft() {
        return draft;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public void setDraft(boolean draft) {
        this.draft = draft;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setItems(Map<String, Integer> items) {
        this.items = items;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public Map<String, Integer> getItems() {
        return items;
    }

    public double getTotal() {
        return total;
    }

    public ObjectId getId() {
        return id;
    }

    public Map<String,String> getSite() {
        return site;
    }

    public String getSiteManager() {
        return siteManager;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public void setSite(Map<String,String> site) {
        this.site = site;
    }

    public void setSiteManager(String siteManager) {
        this.siteManager = siteManager;
    }



}
