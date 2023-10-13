package com.csse.server.controller;
import com.csse.server.model.Item;
import com.csse.server.repository.ItemRepository;
import com.csse.server.service.ItemService;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService repo;

  @GetMapping
   public ResponseEntity<List<Item>> getItems() {
         return new ResponseEntity<List<Item>>(repo.allItems(), HttpStatus.OK);
   }

   @GetMapping("/{id}")
    public ResponseEntity<Optional<Item>> getSingleItem(@PathVariable ObjectId id) {
            
            return new ResponseEntity<Optional<Item>>(repo.singleItem(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item){
        return new ResponseEntity<Item>(repo.addItem(item), HttpStatusCode.valueOf(201));
    }
}
