package com.csse.server.controller;

import com.csse.server.exception.PolicyNotFoundException;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.service.PolicyAndProcedureService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/policies")
public class PolicyAndProcedureController {
    @Autowired
    private PolicyAndProcedureService policyAndProcedureService;
    @GetMapping
    public ResponseEntity<List<PolicyAndProcedure>> getAllPolicies() {
        System.out.println("Get all Policies");
        return new ResponseEntity<List<PolicyAndProcedure>>(policyAndProcedureService.allPolicies(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<PolicyAndProcedure> getSinglePolicy(@PathVariable ObjectId id) throws PolicyNotFoundException {
        System.out.println("Get single Policy");
        return new ResponseEntity<PolicyAndProcedure>(policyAndProcedureService.singlePolicy(id), HttpStatus.OK);
    }
    @PostMapping("/")
    public ResponseEntity<PolicyAndProcedure> createPolicy(@RequestBody PolicyAndProcedure payload) {
        System.out.println("Create Policy");
        return new ResponseEntity<PolicyAndProcedure>(policyAndProcedureService.recordPolicy(payload), HttpStatusCode.valueOf(201));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PolicyAndProcedure> removePolicy(@PathVariable ObjectId id) {
        System.out.println("Delete Policy");
        return new ResponseEntity<PolicyAndProcedure>(policyAndProcedureService.removePolicy(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PolicyAndProcedure> updatePolicy(@PathVariable ObjectId id, @RequestBody  Map<String,Object> fields) {
        System.out.println("Update Policy");
        return new ResponseEntity<PolicyAndProcedure>(policyAndProcedureService.updatePolicy(id, fields), HttpStatus.OK);
    }
}
