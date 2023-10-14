package com.csse.server.controller;

import com.csse.server.model.Comment;
import com.csse.server.model.Order;
import com.csse.server.model.PolicyAndProcedure;
import com.csse.server.service.CommentService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

   /* @PostMapping()
    public ResponseEntity<Comment> createComment(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Comment>(commentService.createComment(payload.get("CommentBody"),payload.get("Id")), HttpStatus.CREATED);
    }*/

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment payload) {
        return new ResponseEntity<Comment>(commentService.createComment(payload), HttpStatus.valueOf(201));
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        System.out.println("Get all Comments");
        return new ResponseEntity<List<Comment>>(commentService.allComments(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Comment>> getSingleComment(@PathVariable ObjectId id) {
        System.out.println("Get single Comment");
        return new ResponseEntity<Optional<Comment>>(commentService.singleComment(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteComment(@PathVariable ObjectId id) {
        System.out.println("Delete Comment");
        boolean result = commentService.deleteComment(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }




}
