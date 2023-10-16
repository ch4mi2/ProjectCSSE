package com.csse.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "comments")
public class Comment {
    @Id
    private ObjectId commentId;
    @DBRef
    private Order orderId;
    private List<String> texts;

    public Comment(Order orderId , List<String> texts){
        this.orderId = orderId;
        this.texts = texts;
    }

    public Order getOrderId(){
        return orderId;
    }
}
