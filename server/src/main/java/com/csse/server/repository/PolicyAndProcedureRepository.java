package com.csse.server.repository;

import com.csse.server.model.PolicyAndProcedure;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PolicyAndProcedureRepository extends MongoRepository<PolicyAndProcedure, ObjectId> {
}
