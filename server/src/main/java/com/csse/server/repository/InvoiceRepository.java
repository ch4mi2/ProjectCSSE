package com.csse.server.repository;


import com.csse.server.model.Invoice;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvoiceRepository extends MongoRepository<Invoice, ObjectId> {

}
