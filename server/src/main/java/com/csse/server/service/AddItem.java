package com.csse.server.service;

import com.csse.server.ItemRepository;
import com.csse.server.repository.PolicyAndProcedureRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;

public class AddItem implements AddPolicy{
    @Autowired
    private ItemRepository itemRepository;
    @Override
    public void recordPolicy(ObjectId id, float amount) {

    }
}
