package com.csse.server.service;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.csse.server.model.Item;
import com.csse.server.repository.ItemRepository;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public ItemService() {
    }
    
    public List<Item> allItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> singleItem(ObjectId id) {
        return itemRepository.findById(id);
    }

    public Item addItem(Item payload) {
        return itemRepository.insert(payload);
    }
}
