package com.csse.server.service;

import com.csse.server.dtos.AnalyticsDTO;
import com.csse.server.model.Order;
import com.csse.server.repository.OrderRepository;
import com.csse.server.states.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
<<<<<<< HEAD
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.http.ResponseEntity;
=======
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
>>>>>>> f639277f59ab88018049b832c991a2414f26ca61
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repo;

    @Autowired
    private MongoTemplate mongoTemplate;

    // Change the state of an order based on the new state provided
    public String changeOrderState(ObjectId orderId, String newState) {
        Optional<Order> optionalOrder = repo.findById(orderId);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            String statusMessage = changeState(order, newState);
            repo.save(order);
            return statusMessage;
        } else {
            return null; // Order not found
        }
    }

    // Helper method to change the state of the order
    private String changeState(Order order, String newState) {
        OrderState state;

        // Determine the new order state based on the newState parameter
        switch (newState.toLowerCase()) {
            case "pending":
                state = new PendingState();
                break;
            case "approved":
                state = new ApprovedState();
                break;
            case "declined":
                state = new DeclinedState();
                break;
            case "placed":
                state = new PlacedState();
                break;
            case "complete":
                state = new CompleteState();
                break;
            case "processing":
                state = new ProcessingState();
                break;
            case "delivering":
                state = new DeliveringState();
                break;
            default:
                return null; // Invalid state request
        }

        order.setState(state.getState());
        return "Order state changed to " + newState + ".";
    }

    // Get all orders
    public List<Order> allOrders() {
        return repo.findAll();
    }

    // Get a single order by its ID
    public Optional<Order> singleOrder(ObjectId id) {
        return repo.findById(id);
    }

    // Add a new order
    public Order addOrder(Order payload) {
        return repo.insert(payload);
    }

    // Get analytics data by grouping orders by site
    public List<AnalyticsDTO> groupBySite() {
        TypedAggregation<Order> orderTypedAggregation = Aggregation.newAggregation(Order.class,
<<<<<<< HEAD
                Aggregation.group("site").addToSet("site").as("site").sum("total").as("totalAmount"),
                Aggregation.sort(Sort.Direction.ASC, "totalAmount"));

        AggregationResults<AnalyticsDTO> results = mongoTemplate.aggregate(orderTypedAggregation, AnalyticsDTO.class);
=======
                Aggregation.group("mainSite")
                        .sum("total").as("totalAmount").first("$mainSite").as("site"),
                Aggregation.sort(Sort.Direction.ASC, "totalAmount"));


        AggregationResults<AnalyticsDTO> results = mongoTemplate.aggregate(orderTypedAggregation, AnalyticsDTO.class);
        System.out.println(results);
>>>>>>> f639277f59ab88018049b832c991a2414f26ca61
        return results.getMappedResults();
    }

    // Get total order analytics
    public AnalyticsDTO getTotal() {
        TypedAggregation<Order> orderTypedAggregation = Aggregation.newAggregation(Order.class,
                Aggregation.group().sum("total").as("totalAmount"));

        AggregationResults<AnalyticsDTO> results = mongoTemplate.aggregate(orderTypedAggregation, AnalyticsDTO.class);
        return results.getUniqueMappedResult();
    }

    // Update an existing order
    public Order updateOrder(Order order) {
        Order existingOrder = repo.findById(order.getId()).orElse(null);

        if (existingOrder == null) {
            return null; // Order not found
        }

        // Update order fields
        existingOrder.setTotal(order.getTotal());
        existingOrder.setSiteManager(order.getSiteManager());
        existingOrder.setComments(order.getComments());
        existingOrder.setDraft(order.isDraft());

        repo.save(existingOrder); // Save the updated order
        return existingOrder;
    }
}
