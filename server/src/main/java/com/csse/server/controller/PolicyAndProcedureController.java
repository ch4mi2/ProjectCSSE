package com.csse.server.controller;

import com.csse.server.exception.PolicyNotFoundException;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.service.PolicyAndProcedureService;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


/**
 * PolicyAndProcedureController which is used to track http req and to fire teh relevant service class function  when needed
 */
@RestController
@RequestMapping("/policies")
public class PolicyAndProcedureController {

    /** Initialize logger */
    public static final Logger log =  LoggerFactory.getLogger(PolicyAndProcedureController.class.getName());

    @Autowired
    private PolicyAndProcedureService policyAndProcedureService;

    /**
     * Method to return all policies
     * @return
     */
    @GetMapping
    public ResponseEntity<List<PolicyAndProcedure>> getAllPolicies() {
        log.info("Get All policies");
        return new ResponseEntity<List<PolicyAndProcedure>>(policyAndProcedureService.allPolicies(), HttpStatus.OK);
    }

    /**
     * method to return a single policy
     * @param id
     * @return
     * @throws PolicyNotFoundException
     */
    @GetMapping("/{id}")
    public ResponseEntity<PolicyAndProcedure> getSinglePolicy(@PathVariable ObjectId id) throws PolicyNotFoundException {
        log.info("Get single Policy");
        return new ResponseEntity<PolicyAndProcedure>(policyAndProcedureService.singlePolicy(id), HttpStatus.OK);
    }

    /**
     * Method to create a policy
     * @param payload
     * @return
     */
    @PostMapping("/")
    public ResponseEntity<PolicyAndProcedure> createPolicy(@RequestBody PolicyAndProcedure payload) {
        log.info("Create Policy");
        return new ResponseEntity<PolicyAndProcedure>(policyAndProcedureService.recordPolicy(payload), HttpStatusCode.valueOf(201));
    }

    /**
     * Method to delete a policy
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<PolicyAndProcedure> removePolicy(@PathVariable ObjectId id) {
        log.info("Delete Policy");
        return new ResponseEntity<PolicyAndProcedure>(policyAndProcedureService.removePolicy(id), HttpStatus.OK);
    }

    /**
     * Method to update a policy
     * @param id
     * @param fields
     * @return
     */
    @PatchMapping("/{id}")
    public ResponseEntity<PolicyAndProcedure> updatePolicy(@PathVariable ObjectId id, @RequestBody  Map<String,Object> fields) {
        log.info("Update Policy");
        return new ResponseEntity<PolicyAndProcedure>(policyAndProcedureService.updatePolicy(id, fields), HttpStatus.OK);
    }
}
