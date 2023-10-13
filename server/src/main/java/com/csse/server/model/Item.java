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
    private Map<String,Double> supplier;
    private String chosenOne;
    private String chosenOnesPrice;

    private String description;
    private boolean restricted;
    private double restrictedAmount;

    public Item(String name, Map<String,Double> supplier, String description, boolean restricted, double restrictedAmount) {
        this.name = name;
        this.supplier = supplier;
        this.description = description;
        this.restricted = restricted;
        this.restrictedAmount = restrictedAmount;
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
    
    public Map<String,Double> getSupplier() {
        return supplier;
    }

    public void setSupplier(Map<String,Double> supplier) {
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

    public double getRestrictedAmount() {
        return restrictedAmount;
    }

    public void setRestrictedAmount(double restrictedAmount) {
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
               
                ", supplier='" + supplier + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
