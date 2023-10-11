package com.csse.server.service;

import com.csse.server.model.Order;
import com.csse.server.repository.OrderRepository;
import com.csse.server.states.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    OrderRepository repo;

    public String changeOrderState(String orderId, String newState) {
        try {
            // Retrieve the order from the repository using the orderId.
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
        } catch (Exception e) {
            return "An error occurred.";
        }
    }

    public String changeState(Order order, String newState) {

        if ("pending".equalsIgnoreCase(newState)) {
            order.setState(new PendingState());
            return "Order state changed to Pending.";
        } else if ("approved".equalsIgnoreCase(newState)) {
            order.setState(new ApprovedState());
            return "Order state changed to Approved.";
        } else if ("declined".equalsIgnoreCase(newState)) {
            order.setState(new DeclinedState());
            return "Order state changed to Declined.";
        } else if ("placed".equalsIgnoreCase(newState)) {
            order.setState(new PlacedState());
            return "Order state changed to Placed.";
        } else if ("complete".equalsIgnoreCase(newState)) {
            order.setState(new CompleteState());
            return "Order state changed to Complete.";
        } else if ("processing".equalsIgnoreCase(newState)) {
            order.setState(new ProcessingState());
            return "Order state changed to Processing.";
        } else if ("delivering".equalsIgnoreCase(newState)) {
            order.setState(new DeliveringState());
            return "Order state changed to Delivering.";
        } else {
            return null; // Return null for an invalid state request.
        }
    }
}
