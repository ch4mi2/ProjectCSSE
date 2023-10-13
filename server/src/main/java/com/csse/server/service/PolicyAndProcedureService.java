package com.csse.server.service;

import com.csse.server.exception.CreatedItemNotFoundException;
import com.csse.server.exception.CreatedSiteNotFoundException;
import com.csse.server.exception.InvalidFormatException;
import com.csse.server.exception.PolicyNotFoundException;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.repository.PolicyAndProcedureRepository;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
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

    public PolicyAndProcedure singlePolicy(ObjectId id) {
        return policyRepo.findById(id).orElseThrow(
                () -> new PolicyNotFoundException("No Policy with id: " + id)
        );
    }

    public PolicyAndProcedure recordPolicy(@NotNull PolicyAndProcedure payload) {
        ReflectPolicyAndProcedure reflectPolicyAndProcedure;
        try {
            if (payload.getType().equals("Item")) {
                reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((AddPolicy) new ItemPolicy());
                reflectPolicyAndProcedure.addPolicyContext.addPolicy(payload.getCreatedItem().getId(), payload.getAmount(), mongoTemplate);
            } else {
                reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((AddPolicy) new RequisitionPolicy());
                reflectPolicyAndProcedure.addPolicyContext.addPolicy(payload.getCreatedSite().getId(), payload.getAmount(), mongoTemplate);
            }
            return policyRepo.insert(payload);
        } catch (NullPointerException e) {
            if (payload.getType() == null) {
                throw new InvalidFormatException("Type field is needed");
            } else if(payload.getType().equals("Site")){
                throw new CreatedSiteNotFoundException("The createdSite field is empty");
            } else {
                throw new CreatedItemNotFoundException("The createdItem field is empty");
            }
        }
    }

    public PolicyAndProcedure removePolicy(ObjectId id) {
        ReflectPolicyAndProcedure reflectPolicyAndProcedure;
        PolicyAndProcedure policyAndProcedure;


        Optional<PolicyAndProcedure> optionalPolicyAndProcedure = policyRepo.findById(id);
        if (optionalPolicyAndProcedure.isPresent()) {
            policyAndProcedure = optionalPolicyAndProcedure.get();
            if (Objects.requireNonNull(policyAndProcedure).getType().equals("Item") &&
                    policyAndProcedure.getCreatedItem() != null) {
                reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((RemovePolicy) new ItemPolicy());
                reflectPolicyAndProcedure.removePolicyContext.removePolicy(policyAndProcedure.getCreatedItem().getId(), mongoTemplate);
            } else if (Objects.requireNonNull(policyAndProcedure).getType().equals("Site") &&
                    policyAndProcedure.getCreatedSite() != null){
                reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((RemovePolicy) new RequisitionPolicy());
                reflectPolicyAndProcedure.removePolicyContext.removePolicy(policyAndProcedure.getCreatedSite().getId(), mongoTemplate);
            }
            policyRepo.deleteById(id);
            return policyAndProcedure;
        } else {
            throw new PolicyNotFoundException("No Policy with id: " + id);
        }
    }


    public PolicyAndProcedure updatePolicy(ObjectId id, Map<String,Object> fields) {
        ReflectPolicyAndProcedure reflectPolicyAndProcedure;

        PolicyAndProcedure policyAndProcedure = null;
        try {
            policyAndProcedure = policyRepo.findById(id).orElse(null);
            if (policyAndProcedure != null) {

                PolicyAndProcedure finalPolicyAndProcedure = policyAndProcedure;
                fields.forEach((key, value) -> {
                    Field field = ReflectionUtils.findField(PolicyAndProcedure.class, key);
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, finalPolicyAndProcedure, value);
                });
                policyAndProcedure = policyRepo.save(policyAndProcedure);

                if (fields.containsKey("amount")) {
                    if (policyAndProcedure.getType().equals("Item")) {
                        reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((UpdatePolicy) new ItemPolicy());
                        reflectPolicyAndProcedure.updatePolicyContext.updatePolicy(policyAndProcedure.getCreatedItem().getId(),
                                policyAndProcedure.getAmount(), mongoTemplate);
                    } else {
                        reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((UpdatePolicy) new RequisitionPolicy());
                        reflectPolicyAndProcedure.updatePolicyContext.updatePolicy(policyAndProcedure.getCreatedSite().getId(),
                                policyAndProcedure.getAmount(), mongoTemplate);
                    }
                }

                return policyAndProcedure;
            } else {
                throw new PolicyNotFoundException("No Policy with id: " + id);
            }
        } catch (NullPointerException e) {
            if (Objects.requireNonNull(policyAndProcedure).getType().equals("Item")) {
                throw new CreatedSiteNotFoundException("The createdItem field is empty");
            } else {
                throw new CreatedSiteNotFoundException("The createdSite field is empty");
            }
        }
    }
}

