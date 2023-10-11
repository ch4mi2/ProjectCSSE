package com.csse.server.controller;

import com.csse.server.model.Order;
import com.csse.server.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/changeState")
    public ResponseEntity<String> changeOrderState(
            @RequestParam String orderId,
            @RequestParam String newState) {
        String result = orderService.changeOrderState(orderId, newState);
        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Invalid state request.", HttpStatus.BAD_REQUEST);
        }
    }
}
