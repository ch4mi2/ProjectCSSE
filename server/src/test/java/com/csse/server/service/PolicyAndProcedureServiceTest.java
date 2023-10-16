package com.csse.server.service;

import com.csse.server.exception.InvalidFormatException;
import com.csse.server.exception.PolicyNotFoundException;
import com.csse.server.model.Item;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.repository.PolicyAndProcedureRepository;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.bson.assertions.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;

class PolicyAndProcedureServiceTest {

    @InjectMocks
    PolicyAndProcedureService policyAndProcedureService;

    @Mock
    PolicyAndProcedureRepository policyAndProcedureRepository;

    private PolicyAndProcedure policy;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        Item item = new Item();
        item.setId(new ObjectId("652a296030150c78a8c67692"));
        item.setName("Sample Item");
        item.setRestricted(true);
        item.setRestrictedAmount(10);
        policy = new PolicyAndProcedure();
        policy.setId(new ObjectId("652a296030150c78a8c67691"));
        policy.setType("Item");
        policy.setAmount(10);
        policy.setCreatedBy("user");
        policy.setCreatedItem(item);
    }

    /**
     * positive test case for getPolicyById
     *
     * @throws JSONException
     */

    @Test
    void testSinglePolicy() throws JSONException {

        when(policyAndProcedureRepository.findById(any())).thenReturn(Optional.of(policy));

        PolicyAndProcedure fetchedPolicy =
                policyAndProcedureService.singlePolicy(new ObjectId("652a296030150c78a8c67692"));

        assertNotNull(fetchedPolicy);
        assertEquals("Item", fetchedPolicy.getType(), false);
        assertEquals("Sample Item", fetchedPolicy.getCreatedItem().getName(), false);
    }


    /**
     * Negative test case for getPolicyById
     */
    @Test
    void testSinglePolicy_PolicyNotFoundException() {
        when(policyAndProcedureRepository.findById(any())).thenReturn(null);

        assertThrows(PolicyNotFoundException.class, () -> {
            policyAndProcedureService.singlePolicy(new ObjectId("652a296030150c78a8c67691"));
        });
    }

    /**
     * Negative test case for recordPolicy
     * @throws JSONException
     */
    @Test
    void testRecordPolicy_InvalidFormatException() throws JSONException {

        policy.setType(null);
        when(policyAndProcedureRepository.insert(any(PolicyAndProcedure.class))).thenReturn(policy);

        assertThrows(InvalidFormatException.class, () -> {
            policyAndProcedureService.recordPolicy(policy);
        });

    }
}