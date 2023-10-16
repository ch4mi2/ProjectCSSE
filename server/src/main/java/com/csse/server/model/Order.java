package com.csse.server.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

// Represents an order entity in the application
@Document(collection = "orders")
public class Order {

    // Unique identifier for the order
    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;

    // Current state of the order (e.g., pending, processing, completed)
    private String state;

    // Total cost of the order
    private double total;

    // Details about the site associated with the order
    private Map<String, String> site;

    // Items and quantities in the order
    private Map<String, Integer> items;

    // Site manager for the order
    private String siteManager;

    // Indicates if the order is a draft
    private boolean draft;

    // Comments associated with the order
    private String comments;

    // Reference to the main site related to the order
    @DBRef
    private Site mainSite;

    // Constructors

    // Default constructor
    public Order() {
    }

    // Constructor to create an order with specified attributes
    public Order(Map<String, Integer> items, double total, Map<String, String> site, String siteManager, String comments,
                 boolean draft, Site mainSite) {
        this.comments = comments;
        this.draft = draft;
        this.total = total;
        this.site = site;
        this.siteManager = siteManager;
        this.items = items;
        this.mainSite = mainSite;
        state = "pending";
    }

    // Getters and setters for various order attributes

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

    public Map<String, String> getSite() {
        return site;
    }

    public String getSiteManager() {
        return siteManager;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public void setSite(Map<String, String> site) {
        this.site = site;
    }

    public void setSiteManager(String siteManager) {
        this.siteManager = siteManager;
    }

    public Site getMainSite() {
        return mainSite;
    }

    public void setMainSite(Site mainSite) {
        this.mainSite = mainSite;
    }
}
