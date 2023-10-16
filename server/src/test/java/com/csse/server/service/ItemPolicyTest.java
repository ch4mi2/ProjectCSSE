package com.csse.server.service;

import com.csse.server.exception.CreatedItemNotFoundException;
import com.csse.server.model.Item;
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

class ItemPolicyTest {

    private Item item;
    @InjectMocks
    ItemPolicy itemPolicy;

    @Mock
    MongoTemplate mongoTemplate;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        item = new Item();
        item.setId(new ObjectId("652a296030150c78a8c67692"));
        item.setName("Sample Item");
        item.setRestricted(false);
        item.setRestrictedAmount(0);
    }


    @Test
    void testAddPolicy() {
        when(mongoTemplate.findById(any(),any(),any())).thenReturn(item);
        when(mongoTemplate.save(any(),any())).thenReturn(item);

        boolean result = itemPolicy.addPolicy(item.getId(), 10, mongoTemplate);

        assertTrue(result);
    }

    @Test
    void testAddPolicyCreatedItemNotFoundException() {
        when(mongoTemplate.findById(any(),any(),any())).thenReturn(null);

        assertThrows(CreatedItemNotFoundException.class, () -> {
            itemPolicy.addPolicy(item.getId(), 10, mongoTemplate);
        });

    }
    @Test
    void testRemovePolicy() {
        when(mongoTemplate.findById(any(),any(),any())).thenReturn(item);
        when(mongoTemplate.save(any(),any())).thenReturn(item);

        boolean result = itemPolicy.removePolicy(item.getId(), mongoTemplate);

        assertTrue(result);
    }

    @Test
    void testRemovePolicyCreatedItemNotFoundException() {
        when(mongoTemplate.findById(any(),any(),any())).thenReturn(null);

        assertThrows(CreatedItemNotFoundException.class, () -> {
            itemPolicy.removePolicy(item.getId(), mongoTemplate);
        });
    }
}