package com.csse.server.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "policiesAndProcedures")
public class PolicyAndProcedure {
    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;
    private String createdBy;
    private String type;
    private float amount;
    private String description;
    @DBRef
    private Item createdItem;
    @DBRef
    private Site createdSite;

    public PolicyAndProcedure(String createdBy, String type, float amount, Item createdItem, Site createdSite, String description) {
        this.createdBy = createdBy;
        this.type = type;
        this.amount = amount;
        this.createdItem = createdItem;
        this.createdSite = createdSite;
        this.description = description;
    }

    public PolicyAndProcedure() {}

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }
    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public Item getCreatedItem() {
        return createdItem;
    }

    public void setCreatedItem(Item createdItem) {
        this.createdItem = createdItem;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Site getCreatedSite() {
        return createdSite;
    }

    public void setCreatedSite(Site createdSite) {
        this.createdSite = createdSite;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
