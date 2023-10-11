package com.csse.server.service;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.repository.PolicyAndProcedureRepository;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PolicyAndProcedureService {
    @Autowired
    private PolicyAndProcedureRepository policyRepo;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<PolicyAndProcedure> allPolicies() {
        return policyRepo.findAll();
    }

    public Optional<PolicyAndProcedure> singlePolicy(ObjectId id) {
        return policyRepo.findById(id);
    }

    public PolicyAndProcedure recordPolicy(@NotNull PolicyAndProcedure payload) {
        ReflectPolicyAndProcedure reflectPolicyAndProcedure;
        if (payload.getType().equals("Item")) {
            reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((AddPolicy) new ItemPolicy());
        } else {
            reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((AddPolicy) new RequisitionPolicy());
        }
        reflectPolicyAndProcedure.addPolicyContext.addPolicy(payload.getCreatedItem().getId(), payload.getAmount(), mongoTemplate);
        return policyRepo.insert(payload);
    }

    public PolicyAndProcedure removePolicy(ObjectId id) {
        ReflectPolicyAndProcedure reflectPolicyAndProcedure;
        PolicyAndProcedure policyAndProcedure;

        try {
            Optional<PolicyAndProcedure> optionalPolicyAndProcedure = policyRepo.findById(id);
            if (optionalPolicyAndProcedure.isPresent()) {
                policyAndProcedure = optionalPolicyAndProcedure.get();
                if (Objects.requireNonNull(policyAndProcedure).getType().equals("Item")) {
                    reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((RemovePolicy) new ItemPolicy());
                } else {
                    reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((RemovePolicy) new RequisitionPolicy());
                }
                reflectPolicyAndProcedure.removePolicyContext.removePolicy(policyAndProcedure.getCreatedItem().getId(), mongoTemplate);
                policyRepo.deleteById(id);
                return policyAndProcedure;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }

    }
}

