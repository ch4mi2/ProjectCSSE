package com.csse.server.repository;

import com.csse.server.model.Item;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRepository extends MongoRepository<Item, ObjectId> {

}
