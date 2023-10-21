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
    private String text;

    public Comment(Order orderId , String text){
        this.orderId = orderId;
        this.text = text;
    }

    public Order getOrderId(){
        return orderId;
    }

    public String getText(){
        return text;
    }
}
