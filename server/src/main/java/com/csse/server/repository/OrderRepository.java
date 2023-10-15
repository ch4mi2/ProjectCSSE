package com.csse.server.repository;


import com.csse.server.model.Order;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, ObjectId> {
    //List<Order> findByStatus(String pending);
}
