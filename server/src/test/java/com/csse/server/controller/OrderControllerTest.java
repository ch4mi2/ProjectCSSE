package com.csse.server.controller;

import com.csse.server.controller.OrderController;
import com.csse.server.dtos.AnalyticsDTO;
import com.csse.server.model.Order;
import com.csse.server.service.OrderService;
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
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class OrderControllerTest {

    @Mock
    private OrderService orderService;

    @InjectMocks
    private OrderController orderController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getAllOrders_shouldReturnAllOrders() {
        List<Order> orders = new ArrayList<>();
        // Populate orders as needed

        when(orderService.allOrders()).thenReturn(orders);

        ResponseEntity<List<Order>> response = orderController.getAllOrders();

        assert response.getStatusCode() == HttpStatus.OK;
        assert response.getBody() != null && response.getBody().equals(orders);
    }

    @Test
    void changeOrderState_shouldChangeStateAndReturnCreatedStatus() {
        ObjectId orderId = new ObjectId();
        String newState = "NEW_STATE";

        when(orderService.changeOrderState(any(ObjectId.class), anyString())).thenReturn(newState);

        ResponseEntity<String> response = orderController.changeOrderState(orderId, newState);

        assert response.getStatusCode() == HttpStatus.CREATED;
        assert response.getBody().equals(newState);
    }

    @Test
    void getSingleOrder_shouldReturnSingleOrder() {
        ObjectId orderId = new ObjectId();
        Order order = new Order(); // Create a sample Order object

        when(orderService.singleOrder(orderId)).thenReturn(Optional.of(order));

        ResponseEntity<Optional<Order>> response = orderController.getSingleOrder(orderId);

        assert response.getStatusCode() == HttpStatus.OK;
        assert response.getBody().isPresent();
        assert response.getBody().get() == order;
    }

    @Test
    void createOrder_shouldReturnCreatedOrder() {
        Order order = new Order(); // Create a sample Order object

        when(orderService.addOrder(any(Order.class))).thenReturn(order);

        ResponseEntity<Order> response = orderController.createOrder(order);

        assert response.getStatusCode() == HttpStatus.CREATED;
        assert response.getBody() == order;
    }

    @Test
    void getAnalytics_shouldReturnAnalyticsData() {
        List<AnalyticsDTO> analyticsList = new ArrayList<>(); // Populate analytics data as needed

        when(orderService.groupBySite()).thenReturn(analyticsList);

        ResponseEntity<List<AnalyticsDTO>> response = orderController.getAnalytics();

        assert response.getStatusCode() == HttpStatus.OK;
        assert response.getBody() != null && response.getBody().equals(analyticsList);
    }

    @Test
    void getTotal_shouldReturnTotalOrderData() {
        AnalyticsDTO totalData = new AnalyticsDTO(); // Populate total data as needed

        when(orderService.getTotal()).thenReturn(totalData);

        ResponseEntity<AnalyticsDTO> response = orderController.getTotal();

        assert response.getStatusCode() == HttpStatus.OK;
        assert response.getBody() == totalData;
    }

    @Test
    void updateOrder_shouldUpdateAndReturnUpdatedOrder() {
        Order order = new Order(); // Create a sample Order object

        when(orderService.updateOrder(any(Order.class))).thenReturn(order);

        ResponseEntity<Order> response = orderController.updateOrder(order);

        assert response.getStatusCode() == HttpStatus.OK;
        assert response.getBody() == order;
    }
}
