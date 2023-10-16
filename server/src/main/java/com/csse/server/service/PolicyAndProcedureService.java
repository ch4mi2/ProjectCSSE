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

/**
 *
 * Service class which contains the business logic for policies and procedures
 *
 * @version 1
 */
@Service
public class PolicyAndProcedureService {
    @Autowired
    private PolicyAndProcedureRepository policyRepo;
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * Return all policies stored in the database
     * @return list of model PolicyAndProcedure
     */
    public List<PolicyAndProcedure> allPolicies() {
        return policyRepo.findAll();
    }


    /**
     *
     * Return a single policy when the Object id is given
     * @param id - Object id of the needed policy
     * @return the fetched policy
     * @throws PolicyNotFoundException if the policy is not found
     */
    public PolicyAndProcedure singlePolicy(ObjectId id) throws PolicyNotFoundException{
        try {
            PolicyAndProcedure fetchedPolicy = policyRepo.findById(id).orElse(null);
            if( fetchedPolicy == null ) {
                throw new NullPointerException();
            } else {
                return fetchedPolicy;
            }
        } catch (NullPointerException ex) {
            throw new PolicyNotFoundException("No Policy with id: " + id);
        }
    }

    /**
     * This method utilizes strategy pattern to create policies and
     * update needed collection of the database according to the need
     * @param payload - PolicyAndProcedure type object sent from the controller
     * @return the created policy
     * @throws InvalidFormatException - if the type is not present
     * @throws CreatedSiteNotFoundException - if the site given to create the policy on does not exist
     * @throws CreatedItemNotFoundException - if the item given to create the policy on does not exist
     */
    public PolicyAndProcedure recordPolicy(@NotNull PolicyAndProcedure payload) throws
            InvalidFormatException, CreatedSiteNotFoundException , CreatedItemNotFoundException {
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


    /**
     * Used to delete policies when the Object Id is given
     * Relevant collections will be updated using strategy pattern as well
     * @param id - Object ID
     * @return updated object of PolicyAndProcedure
     * @throws PolicyNotFoundException if policy with given id is not found
     */
    public PolicyAndProcedure removePolicy(ObjectId id) throws PolicyNotFoundException{
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

    /**
     * This method is used to update policies and relevant collections in the databsae
     * @param id
     * @param fields - used to map fields with attributes of PolicyAndProcedure model to patch needed fields
     * @return deleted PolicyAndProcedure object
     * @throws NullPointerException
     * @throws CreatedSiteNotFoundException
     * @throws CreatedItemNotFoundException
     */
    public PolicyAndProcedure updatePolicy(ObjectId id, Map<String,Object> fields) throws NullPointerException,
            CreatedSiteNotFoundException , CreatedItemNotFoundException{
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
                    if (fields.containsKey("createdItem") && policyAndProcedure.getType().equals("Item")) {
                        reflectPolicyAndProcedure = new ReflectPolicyAndProcedure((UpdatePolicy) new ItemPolicy());
                        reflectPolicyAndProcedure.updatePolicyContext.updatePolicy(policyAndProcedure.getCreatedItem().getId(),
                                policyAndProcedure.getAmount(), mongoTemplate);
                    } else if(fields.containsKey("createdSite") && policyAndProcedure.getType().equals("Site")) {
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
                throw new CreatedItemNotFoundException("The createdItem field is empty");
            } else {
                throw new CreatedSiteNotFoundException("The createdSite field is empty");
            }
        }
    }
}

