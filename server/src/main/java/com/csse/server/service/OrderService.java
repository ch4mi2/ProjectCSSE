package com.csse.server.service;

import com.csse.server.dtos.AnalyticsDTO;
import com.csse.server.model.Comment;
import com.csse.server.model.Order;
import com.csse.server.repository.OrderRepository;
import com.csse.server.states.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository repo;
    @Autowired
    private MongoTemplate mongoTemplate;

     public String changeOrderState(ObjectId orderId, String newState) {
         //try {
             // Retrieve the order from the repository using the orderId.

         logger.info("Changing order state for orderId: {} to newState: {}", orderId, newState);

             Optional<Order> optionalOrder = repo.findById(orderId);

             if (optionalOrder.isPresent()) {
                 Order order = optionalOrder.get();

                 // Change the order state based on the newState parameter.
                 String statusMessage = changeState(order, newState);

                 // Save the updated order back to MongoDB.
                 repo.save(order);

                 return statusMessage;
             } else {
                 return null; // Return null for not found.
             }
 //        } catch (Exception e) {
 //            return "An error occurred.";
 //        }
     }

    public String changeState(Order order, String newState) {

        if ("pending".equalsIgnoreCase(newState)) {
            OrderState state = new PendingState();
            order.setState(state.getState());
            return "Order state changed to Pending.";
        } else if ("approved".equalsIgnoreCase(newState)) {
            OrderState state = new ApprovedState();
            order.setState(state.getState());
            return "Order state changed to Approved.";
        } else if ("declined".equalsIgnoreCase(newState)) {
            OrderState state = new DeclinedState();
            order.setState(state.getState());
            return "Order state changed to Declined.";
        } else if ("placed".equalsIgnoreCase(newState)) {
            OrderState state = new PlacedState();
            order.setState(state.getState());
            return "Order state changed to Placed.";
        } else if ("complete".equalsIgnoreCase(newState)) {
            OrderState state = new CompleteState();
            order.setState(state.getState());
            return "Order state changed to Complete.";
        } else if ("processing".equalsIgnoreCase(newState)) {
            OrderState state = new ProcessingState();
            order.setState(state.getState());
            return "Order state changed to Processing.";
        } else if ("delivering".equalsIgnoreCase(newState)) {
            OrderState state = new DeliveringState();
            order.setState(state.getState());
            return "Order state changed to Delivering.";
        } else {
            return null; // Return null for an invalid state request.
        }
    }

    public OrderService() {
    }

    public List<Order> allOrders() {
        return repo.findAll();
    }

    public Optional<Order> singleOrder(ObjectId id) {
        return repo.findById(id);
    }

    public Order addOrder(Order payload) {
        return repo.insert(payload);
    }

    public List<AnalyticsDTO>  groupBySite() {
        TypedAggregation<Order> orderTypedAggregation = Aggregation.newAggregation(Order.class,
                Aggregation.group("mainSite")
                        .sum("total").as("totalAmount").first("$mainSite").as("site"),
                Aggregation.sort(Sort.Direction.ASC, "totalAmount"));


        AggregationResults<AnalyticsDTO> results = mongoTemplate.aggregate(orderTypedAggregation, AnalyticsDTO.class);
        System.out.println(results);
        return results.getMappedResults();
    }

    public AnalyticsDTO  getTotal() {
        TypedAggregation<Order> orderTypedAggregation = Aggregation.newAggregation(Order.class,
                Aggregation.group()
                        .sum("total").as("totalAmount"));

        AggregationResults<AnalyticsDTO> results = mongoTemplate.aggregate(orderTypedAggregation, AnalyticsDTO.class);

        return results.getUniqueMappedResult();
    }

    public Order updateOrder(Order order) {
        // Find the order to be updated.
        Order existingOrder = repo.findById(order.getId()).orElse(null);
    
        // If the order does not exist, return null.
        if (existingOrder == null) {
            return null;
        }
    
        // Update the order fields.
        existingOrder.setTotal(order.getTotal());
        existingOrder.setSiteManager(order.getSiteManager());
        existingOrder.setComments(order.getComments());
        existingOrder.setDraft(order.isDraft());
    
        // Save the updated order to the database.
        repo.save(existingOrder);
    
        // Return the updated order.
        return existingOrder;
    }
}
