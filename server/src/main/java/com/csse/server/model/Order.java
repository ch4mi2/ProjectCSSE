package com.csse.server.model;
import java.util.Map;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orders")
public class Order {
    @Id
    private ObjectId id;
    private String state;
    private double total;
    private String site;
    private Map<String, Integer> itemsAndQty;
    private Map<String, String> itemsAndSupplier;
    private String siteManager;
    private Map<String, Double> restrictedItemsAndQty;

    public Order(Map<String, Integer> items, double total, String site, String siteManager, Map<String, String> itemsAndSupplier, Map<String, Double> restrictedItemsAndQty) {
        this.itemsAndSupplier = itemsAndSupplier;
        this.restrictedItemsAndQty = restrictedItemsAndQty;
        this.total = total;
        this.site = site;
        this.siteManager = siteManager;
        this.itemsAndQty = items;
        state = "pending";
    }

    public Map<String, String> getItemsAndSupplier() {
        return itemsAndSupplier;
    }

    public Map<String, Double> getRestrictedItemsAndQty() {
        return restrictedItemsAndQty;
    }

    public void setRestrictedItemsAndQty(Map<String, Double> restrictedItemsAndQty) {
        this.restrictedItemsAndQty = restrictedItemsAndQty;
    }

    public void setItemsAndSupplier(Map<String, String> itemsAndSupplier) {
        this.itemsAndSupplier = itemsAndSupplier;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setItems(Map<String, Integer> items) {
        this.itemsAndQty = items;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public Map<String, Integer> getItems() {
        return itemsAndQty;
    }

    public double getTotal() {
        return total;
    }

    public ObjectId getId() {
        return id;
    }

    public String getSite() {
        return site;
    }

    public String getSiteManager() {
        return siteManager;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public void setSiteManager(String siteManager) {
        this.siteManager = siteManager;
    }



}
