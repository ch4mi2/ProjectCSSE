package com.csse.server.controller;

import com.csse.server.ItemRepository;
import com.csse.server.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ItemController {

    @Autowired
    ItemRepository repo;

    @GetMapping("/items")
    public List<Item> getAllItems(){
        System.out.println("GET all items");
        return repo.findAll();

    }
}
