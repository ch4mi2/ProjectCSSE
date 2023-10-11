package com.csse.server.service;
import com.csse.server.repository.ItemRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;

public class AddItem implements AddPolicy{
    @Autowired
    private ItemRepository itemRepository;
    
    @Override
    public void reflectPolicy(ObjectId id, float amount) {
        System.out.println("Fires Item");
    }
}
