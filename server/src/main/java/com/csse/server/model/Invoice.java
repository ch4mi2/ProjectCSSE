/*
Description: This the model
 */
package com.csse.server.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Map;

@Document(collection = "invoice")

public class Invoice {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String siteName;
    private String siteAddress;
    private Date invoiceDate;
    private Map<String, Integer> items;
    private double total;

    // Constructors, getters, and setters

    // Default constructor
    public Invoice() {
    }

    // Constructor with parameters
    public Invoice(String siteName, String siteAddress, Date invoiceDate, Map<String, Integer> items, double total) {
        this.siteName = siteName;
        this.siteAddress = siteAddress;
        this.invoiceDate = invoiceDate;
        this.items = items;
        this.total = total;
    }

    // Getters and setters for all fields
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getSiteAddress() {
        return siteAddress;
    }

    public void setSiteAddress(String siteAddress) {
        this.siteAddress = siteAddress;
    }

    public Date getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(Date invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Map<String, Integer> getItems() {
        return items;
    }

    public void setItems(Map<String, Integer> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}

