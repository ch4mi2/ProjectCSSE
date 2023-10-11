package com.csse.server.model;
import java.util.Map;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.csse.server.states.OrderState;
import com.csse.server.states.PendingState;

@Document(collection = "orders")
public class Order {
    @Id
    private ObjectId id;

    private OrderState state;
    private Map<Item, Integer> items;
    private float total;


    public Order(Map<Item, Integer> items, float total) {
        this.total = total;
        this.items = items;
        state = new PendingState();
    }

    public String getState() {
        return state.getState();
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void setItems(Map<Item, Integer> items) {
        this.items = items;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public Map<Item, Integer> getItems() {
        return items;
    }

    public float getTotal() {
        return total;
    }
}
