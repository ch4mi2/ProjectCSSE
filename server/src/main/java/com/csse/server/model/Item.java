package com.csse.server.model;
import java.util.Map;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "items")
public class Item {
    @Id
    private ObjectId id;
    private String name;
    private Map<String,Float> supplier;
    private String chosenOne;
    private String chosenOnesPrice;

    private String description;
    private boolean restricted;
    private float restrictedAmount;

    public Item() {
    }



    public ObjectId getId() {
        return id;
    }
    public void setId(ObjectId id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public Map<String,Float> getSupplier() {
        return supplier;
    }

    public void setSupplier(Map<String,Float> supplier) {
        this.supplier = supplier;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isRestricted() {
        return restricted;
    }

    public void setRestricted(boolean restricted) {
        this.restricted = restricted;
    }

    public float getRestrictedAmount() {
        return restrictedAmount;
    }

    public void setRestrictedAmount(float restrictedAmount) {
        this.restrictedAmount = restrictedAmount;
    }

    public String getChosenOne() {
        return chosenOne;
    }

    public void setChosenOne(String chosenOne) {
        this.chosenOne = chosenOne;
    }

    public String getChosenOnesPrice() {
        return chosenOnesPrice;
    }

    public void setChosenOnesPrice(String chosenOnesPrice) {
        this.chosenOnesPrice = chosenOnesPrice;
    }



    @Override
    public String toString() {
        return "Item{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", supplier='" + supplier + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
