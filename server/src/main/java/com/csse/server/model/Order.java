package com.csse.server.model;
import java.util.Map;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import com.csse.server.states.OrderState;
import com.csse.server.states.PendingState;

@Document(collection = "orders")
public class Order {
    @Id
    private ObjectId id;
    private OrderState state;
    private float total;
    
    @DBRef
    private Site site;

    private Map<String, Integer> items;
    
    @DBRef
    private SiteManager siteManager;


    public Order(Map<String, Integer> items, float total, Site site, SiteManager siteManager) {
        this.total = total;
        this.site = site;
        this.siteManager = siteManager;
        this.items = items;
        state = new PendingState();
    }

    public String getState() {
        return state.getState();
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void setItems(Map<String, Integer> items) {
        this.items = items;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public Map<String, Integer> getItems() {
        return items;
    }

    public float getTotal() {
        return total;
    }

    public ObjectId getId() {
        return id;
    }

    public Site getSite() {
        return site;
    }

    public SiteManager getSiteManager() {
        return siteManager;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public void setSiteManager(SiteManager siteManager) {
        this.siteManager = siteManager;
    }



}
