package com.csse.server.service;
import com.csse.server.model.Item;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.repository.PolicyAndProcedureRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PolicyAndProcedureService {
    @Autowired
    private PolicyAndProcedureRepository policyRepo;
    public List<PolicyAndProcedure> allPolicies() {
        return policyRepo.findAll();
    }

    public Optional<PolicyAndProcedure> singlePolicy(ObjectId id) {
        return policyRepo.findById(id);
    }

//    public PolicyAndProcedure recordItemPolicy(String createdBy, String type, float amount, Item createdItem) {
//        addPolicy.recordPolicy(createdItem.getId(),amount);
//        PolicyAndProcedure policyAndProcedure = new PolicyAndProcedure(createdBy,type,amount,createdItem);
//        return policyRepo.insert(policyAndProcedure);
//    }

    public PolicyAndProcedure recordPolicy(@org.jetbrains.annotations.NotNull PolicyAndProcedure payload) {
        ReflectPolicyAndProcedure reflectPolicyAndProcedure;
        if (payload.getType().equals("Item")) {
            reflectPolicyAndProcedure = new ReflectPolicyAndProcedure(new AddItem());
        } else {
            reflectPolicyAndProcedure = new ReflectPolicyAndProcedure(new AddRequisition());
        }
        reflectPolicyAndProcedure.contextPolicy.reflectPolicy(payload.getCreatedItem().getId(), payload.getAmount());
        return policyRepo.insert(payload);
    }
}

