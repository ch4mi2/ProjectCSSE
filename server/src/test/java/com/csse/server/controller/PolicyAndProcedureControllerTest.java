package com.csse.server.controller;

import com.csse.server.model.Item;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.service.PolicyAndProcedureService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(controllers = PolicyAndProcedureController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
class PolicyAndProcedureControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PolicyAndProcedureService policyAndProcedureService;

    @Autowired
    private Item item;
    private PolicyAndProcedure policyAndProcedure;

    @BeforeEach
    public void init() {
        item = new Item();
        item.setId(new ObjectId("652a296030150c78a8c67692"));
        item.setName("Sample Item");
        item.setRestricted(true);
        item.setRestrictedAmount(10);
        policyAndProcedure = new PolicyAndProcedure();
        policyAndProcedure.setType("Item");
        policyAndProcedure.setAmount(10);
        policyAndProcedure.setCreatedBy("user");
        policyAndProcedure.setCreatedItem(item);

    }

    @Test
    void testGetAllPolicies() throws Exception {
        ResultActions response = mockMvc.perform(get("/policies")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testGetSinglePolicy() throws Exception {
        ObjectId id = new ObjectId();

        when(policyAndProcedureService.singlePolicy(id)).thenReturn(policyAndProcedure);

        ResultActions response = mockMvc.perform(get("/policies")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }

}