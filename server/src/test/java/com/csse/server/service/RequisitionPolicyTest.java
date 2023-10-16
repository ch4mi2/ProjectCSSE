package com.csse.server.service;

import com.csse.server.exception.CreatedSiteNotFoundException;
import com.csse.server.model.Site;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.mongodb.core.MongoTemplate;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class RequisitionPolicyTest {

    private Site site;

    @InjectMocks
    RequisitionPolicy requisitionPolicy;

    @Mock
    MongoTemplate mongoTemplate;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        site = new Site();
        site.setId(new ObjectId("652a296030150c78a8c67692"));
        site.setName("Sample name");
        site.setOrderLimit(0);
    }

    @Test
    void testAddPolicy() {
        when(mongoTemplate.findById(any(),any(),any())).thenReturn(site);
        when(mongoTemplate.save(any(),any())).thenReturn(site);

        boolean result = requisitionPolicy.addPolicy(site.getId(), 10000, mongoTemplate);

        assertTrue(result);
    }
    @Test
    void testAddPolicyCreatedSiteNotFoundException() {
        when(mongoTemplate.findById(any(),any(),any())).thenReturn(null);

        assertThrows(CreatedSiteNotFoundException.class, () -> {
            requisitionPolicy.addPolicy(site.getId(), 10000, mongoTemplate);
        });
    }
    @Test
    void testUpdatePolicy() {
        when(mongoTemplate.findById(any(),any(),any())).thenReturn(site);
        when(mongoTemplate.save(any(),any())).thenReturn(site);

        boolean result = requisitionPolicy.updatePolicy(site.getId(), 10000, mongoTemplate);

        assertTrue(result);
    }
    @Test
    void testUpdatePolicyCreatedSiteNotFoundException() {
        when(mongoTemplate.findById(any(),any(),any())).thenReturn(null);

        assertThrows(CreatedSiteNotFoundException.class, () -> {
            requisitionPolicy.updatePolicy(site.getId(), 10000, mongoTemplate);
        });
    }
}