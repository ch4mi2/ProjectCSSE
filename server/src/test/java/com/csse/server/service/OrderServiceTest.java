package com.csse.server.service;

import com.csse.server.dtos.AnalyticsDTO;
import com.csse.server.model.Order;
import com.csse.server.repository.OrderRepository;
import com.csse.server.states.*;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    void changeOrderState_shouldReturnNullForInvalidState() {
        ObjectId orderId = new ObjectId();
        String newState = "INVALID_STATE";
        Order order = new Order();
        when(orderRepository.findById(any())).thenReturn(Optional.of(order));

        String result = orderService.changeOrderState(orderId, newState);

        assert result == null;
    }

    @Test
    void allOrders_shouldReturnAllOrders() {
        List<Order> orders = new ArrayList<>();
        when(orderRepository.findAll()).thenReturn(orders);

        List<Order> result = orderService.allOrders();

        assert result != null;
        assert result.equals(orders);
    }

    @Test
    void singleOrder_shouldReturnSingleOrder() {
        ObjectId orderId = new ObjectId();
        Order order = new Order();
        when(orderRepository.findById(any())).thenReturn(Optional.of(order));

        Optional<Order> result = orderService.singleOrder(orderId);

        assert result.isPresent();
        assert result.get() == order;
    }

    @Test
    void addOrder_shouldReturnAddedOrder() {
        Order order = new Order();
        when(orderRepository.insert((Order) any())).thenReturn(order);

        Order result = orderService.addOrder(order);

        assert result != null;
        assert result == order;
    }


    @Test
    void updateOrder_shouldUpdateAndReturnUpdatedOrder() {
        Order order = new Order();
        ObjectId orderId = new ObjectId();
        when(orderRepository.findById(any())).thenReturn(Optional.of(order));
        when(orderRepository.save(any())).thenReturn(order);

        Order result = orderService.updateOrder(order);

        assert result != null;
        assert result == order;
    }

    @Test
    void updateOrder_shouldReturnNullForNonExistingOrder() {
        Order order = new Order();
        ObjectId orderId = new ObjectId();
        when(orderRepository.findById(any())).thenReturn(Optional.empty());

        Order result = orderService.updateOrder(order);

        assert result == null;
    }

}
