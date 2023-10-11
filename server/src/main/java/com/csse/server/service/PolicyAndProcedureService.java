package com.csse.server.service;

import com.csse.server.model.Item;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.repository.PolicyAndProcedureRepository;
import jakarta.annotation.PostConstruct;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyAndProcedureService {
    @Autowired
    private PolicyAndProcedureRepository policyRepo;
    private AddPolicy addPolicy;

    public PolicyAndProcedureService() {
    }
    @Autowired
    public PolicyAndProcedureService(AddPolicy addPolicy) {
        this.addPolicy = addPolicy;
    }
    public List<PolicyAndProcedure> allPolicies() {
        return policyRepo.findAll();
    }

    public Optional<PolicyAndProcedure> singlePolicy(ObjectId id) {
        return policyRepo.findById(id);
    }

    public PolicyAndProcedure recordItemPolicy(String createdBy, String type, float amount, Item createdItem) {
        addPolicy.recordPolicy(createdItem.getId(),amount);
        PolicyAndProcedure policyAndProcedure = new PolicyAndProcedure(createdBy,type,amount,createdItem);
        return policyRepo.insert(policyAndProcedure);
    }

    public PolicyAndProcedure recordRequisitionPolicy(PolicyAndProcedure payload) {
//        addPolicy.recordPolicy(payload.getCreatedItem().getId(), payload.getAmount());
        return policyRepo.insert(payload);
    }
}
