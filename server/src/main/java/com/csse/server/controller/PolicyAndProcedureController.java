package com.csse.server.controller;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.service.PolicyAndProcedureService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/policies")
public class PolicyAndProcedureController {
    @Autowired
    private PolicyAndProcedureService policyAndProcedureService;
    @GetMapping
    public ResponseEntity<List<PolicyAndProcedure>> getAllPolicies() {
        System.out.println("Get all Policies");
        return new ResponseEntity<List<PolicyAndProcedure>>(policyAndProcedureService.allPolicies(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<PolicyAndProcedure>> getSinglePolicy(@PathVariable ObjectId id) {
        System.out.println("Get single Policy");
        return new ResponseEntity<Optional<PolicyAndProcedure>>(policyAndProcedureService.singlePolicy(id), HttpStatus.OK);
    }
    @PostMapping("/item")
    public ResponseEntity<PolicyAndProcedure> createPolicy(@RequestBody PolicyAndProcedure payload) {
        return new ResponseEntity<PolicyAndProcedure>(policyAndProcedureService.recordPolicy(payload), HttpStatusCode.valueOf(201));
    }


}
