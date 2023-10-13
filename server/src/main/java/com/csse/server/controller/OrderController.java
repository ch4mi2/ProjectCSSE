package com.csse.server.controller;
import com.csse.server.model.Order;
import com.csse.server.service.OrderService;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders/")
public class OrderController {
    
    @Autowired
    OrderService orderService;
    
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        System.out.println("Get all Orders");
        return new ResponseEntity<List<Order>>(orderService.allOrders(), HttpStatus.OK);
    }
    //Changed this . why? idk
    //@PostMapping("/changeState")
    @PostMapping("/{id}{changeState}")
    public ResponseEntity<String> changeOrderState(
            @RequestParam ObjectId orderId,  //Changed this . why? idk
            @RequestParam String newState) {
        String result = orderService.changeOrderState(orderId, newState);
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

    
}
