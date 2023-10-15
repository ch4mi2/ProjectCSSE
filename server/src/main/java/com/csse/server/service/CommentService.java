package com.csse.server.service;

import com.csse.server.model.Comment;
import com.csse.server.model.Item;
import com.csse.server.model.Order;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.repository.CommentRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository repo;

//    @Autowired
//    private MongoTemplate mongoTemplate;
    public Comment createComment(Comment payload) {
        return repo.insert(payload);
    }

    public List<Comment> allComments() {
        return repo.findAll();
    }

    public Optional<Comment> singleComment(ObjectId id) {
        return repo.findById(id);
    }


    public boolean deleteComment(ObjectId id) {
        try{
            repo.deleteById(id);
            return true;
        } catch (Exception e){
            return false;
        }
    }



}
