package com.csse.server.controller;
import com.csse.server.dtos.AnalyticsDTO;
import com.csse.server.model.Order;
import com.csse.server.service.OrderService;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders/")
public class  OrderController {
    
    @Autowired
    OrderService orderService;
    
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        System.out.println("Get all Orders");
        return new ResponseEntity<List<Order>>(orderService.allOrders(), HttpStatus.OK);
    }

     @PatchMapping("/state/{id}")
     public ResponseEntity<String> changeOrderState(
             @PathVariable ObjectId id,
             @RequestBody String newState) {
         System.out.println(newState);
         String result = orderService.changeOrderState(id, newState);
         if (result != null) {
             return new ResponseEntity<>(result, HttpStatus.CREATED);
         } else {
             return new ResponseEntity<>("Invalid state request.", HttpStatus.BAD_REQUEST);
         }
     }


    @GetMapping("/{id}")
    public ResponseEntity<Optional<Order>> getSingleOrder(@PathVariable ObjectId id) {
        System.out.println("Get single Order");
        return new ResponseEntity<Optional<Order>>(orderService.singleOrder(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order payload) {
        return new ResponseEntity<Order>(orderService.addOrder(payload), HttpStatus.valueOf(201));
    }


    @GetMapping("analytics/")
    public ResponseEntity<List<AnalyticsDTO>> getAnalytics() {
        return new ResponseEntity<List<AnalyticsDTO>>(orderService.groupBySite(), HttpStatus.OK);
    }

    @GetMapping("total/")
    public ResponseEntity<AnalyticsDTO> getTotal() {
        return new ResponseEntity<AnalyticsDTO>(orderService.getTotal(), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@RequestBody Order payload) {
        return new ResponseEntity<Order>(orderService.updateOrder(payload), HttpStatus.OK);
    }

}
