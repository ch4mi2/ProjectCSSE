package com.csse.server.service;

import com.csse.server.model.Comment;
import com.csse.server.model.Order;
import com.csse.server.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class CommentServiceTest {
    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void createdComment_shouldReturnCreatedComment() {
        Comment comment = new Comment();
        when(commentRepository.insert((Comment) any())).thenReturn(comment);

        Comment result = commentService.createComment(comment);

        assert result != null;
        assert result == comment;
    }

    @Test
    void allComments_shouldReturnAllComments() {
        List<Comment> comments = new ArrayList<>();
        when(commentRepository.findAll()).thenReturn(comments);

        List<Comment> result = commentService.allComments();

        assert result != null;
        assert result.equals(comments);
    }
}
