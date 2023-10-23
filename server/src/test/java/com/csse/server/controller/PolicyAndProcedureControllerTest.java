package com.csse.server.controller;

import com.csse.server.model.Item;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.service.PolicyAndProcedureService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;
import org.hamcrest.Matchers;
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

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(controllers = PolicyAndProcedureController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
class PolicyAndProcedureControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PolicyAndProcedureService policyAndProcedureService;
    private static ObjectMapper mapper = new ObjectMapper();

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
        List<PolicyAndProcedure> policies = new ArrayList<>();
        PolicyAndProcedure emptyPolicy = new PolicyAndProcedure();
        policies.add(policyAndProcedure);
        policies.add(emptyPolicy);

        when(policyAndProcedureService.allPolicies()).thenReturn(policies);

        ResultActions response = mockMvc.perform(get("/policies")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk());
        response.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));
        response.andExpect(MockMvcResultMatchers.jsonPath("$[1].type", Matchers.nullValue()));
    }

    @Test
    void testGetSinglePolicy() throws Exception {
        ObjectId id = new ObjectId();

        when(policyAndProcedureService.singlePolicy(any())).thenReturn(policyAndProcedure);

        ResultActions response = mockMvc.perform(get("/policies/" + id)
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk());
        response.andExpect(MockMvcResultMatchers.jsonPath("$.type", Matchers.equalTo("Item")));
        response.andExpect(MockMvcResultMatchers.jsonPath("$.createdSite", Matchers.nullValue()));
        response.andExpect(MockMvcResultMatchers.jsonPath("$.createdItem.name", Matchers.equalTo("Sample Item")));
    }

    @Test
    void testCreatePolicy() throws Exception {
        when(policyAndProcedureService.recordPolicy(any())).thenReturn(policyAndProcedure);
        String json = mapper.writeValueAsString(policyAndProcedure);

        ResultActions response = mockMvc.perform(post("/policies/")
                .contentType(MediaType.APPLICATION_JSON).content(json));

        response.andExpect(MockMvcResultMatchers.status().isCreated());
        response.andExpect(MockMvcResultMatchers.jsonPath("$.type", Matchers.equalTo("Item")));
        response.andExpect(MockMvcResultMatchers.jsonPath("$.createdSite", Matchers.nullValue()));
        response.andExpect(MockMvcResultMatchers.jsonPath("$.createdItem.restricted", Matchers.equalTo(true)));
    }

}