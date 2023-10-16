package com.csse.server.controller;
import com.csse.server.dtos.AnalyticsDTO;
import com.csse.server.model.Order;
import com.csse.server.service.OrderService;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Controller for managing orders
@RestController
@RequestMapping("/api/orders/")
public class OrderController {
    
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    OrderService orderService;
    
    // Endpoint to get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        logger.info("Get all Orders");
        return new ResponseEntity<List<Order>>(orderService.allOrders(), HttpStatus.OK);
    }

    // Endpoint to change the state of an order
    @PatchMapping("/state/{id}")
    public ResponseEntity<String> changeOrderState(
             @PathVariable ObjectId id,
             @RequestBody String newState) {
        logger.info("New state : ", newState);
         String result = orderService.changeOrderState(id, newState);
         if (result != null) {
            logger.info("x:1");
             return new ResponseEntity<>(result, HttpStatus.CREATED);
         } else {
            logger.info("x:2");
             return new ResponseEntity<>("Invalid state request.", HttpStatus.BAD_REQUEST);
         }
     }

    // Endpoint to get a single order by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Order>> getSingleOrder(@PathVariable ObjectId id) {
        logger.info("Get a single order");
        return new ResponseEntity<Optional<Order>>(orderService.singleOrder(id), HttpStatus.OK);
    }

    // Endpoint to create a new order
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order payload) {
        return new ResponseEntity<Order>(orderService.addOrder(payload), HttpStatus.valueOf(201));
    }

    // Endpoint to get analytics data for orders
    @GetMapping("analytics/")
    public ResponseEntity<List<AnalyticsDTO>> getAnalytics() {
        return new ResponseEntity<List<AnalyticsDTO>>(orderService.groupBySite(), HttpStatus.OK);
    }

    // Endpoint to get the total order data
    @GetMapping("total/")
    public ResponseEntity<AnalyticsDTO> getTotal() {
        return new ResponseEntity<AnalyticsDTO>(orderService.getTotal(), HttpStatus.OK);
    }

    // Endpoint to update an existing order
    @PatchMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@RequestBody Order payload) {
        logger.info("Payload : ", payload);
        return new ResponseEntity<Order>(orderService.updateOrder(payload), HttpStatus.OK);
    }
}
