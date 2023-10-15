package com.csse.server.repository;


import com.csse.server.dtos.AnalyticsDTO;
import com.csse.server.model.Order;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, ObjectId> {

}
