package com.csse.server.repository;
import com.csse.server.model.Order;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

// Spring Data MongoDB repository for the Order entity
public interface OrderRepository extends MongoRepository<Order, ObjectId> {
}
