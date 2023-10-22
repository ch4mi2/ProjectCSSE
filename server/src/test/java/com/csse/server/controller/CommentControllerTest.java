package com.csse.server.controller;

import com.csse.server.model.Comment;
import com.csse.server.model.Order;
import com.csse.server.repository.CommentRepository;
import com.csse.server.service.CommentService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;

public class CommentControllerTest {

    @Mock
    private CommentService commentService;

    @InjectMocks
    private CommentController commentController;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void createComment_shouldReturnSuccessStatus() {
        Comment comment = new Comment(); // Create a sample Order object

        when(commentService.createComment(any(Comment.class))).thenReturn(comment);

        ResponseEntity<Comment> response = commentController.createComment(comment);

        assert response.getStatusCode() == HttpStatus.CREATED;
    }

    @Test
    void getAllComments_shouldReturnSuccessfullStatus() {
        List<Comment> comments = new ArrayList<>();


        when(commentService.allComments()).thenReturn(comments);

        ResponseEntity<List<Comment>> response = commentController.getAllComments();

        assert response.getStatusCode() == HttpStatus.OK;
    }

}
