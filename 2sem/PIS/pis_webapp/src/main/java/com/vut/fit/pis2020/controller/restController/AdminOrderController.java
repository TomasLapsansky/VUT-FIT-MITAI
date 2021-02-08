package com.vut.fit.pis2020.controller.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vut.fit.pis2020.converter.OrderDtoConverter;
import com.vut.fit.pis2020.dto.OrderDto;
import com.vut.fit.pis2020.dto.OrderStatusDto;
import com.vut.fit.pis2020.entity.Order;
import com.vut.fit.pis2020.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDtoConverter orderDtoConverter;

    @Autowired
    private ObjectMapper jsonObjectMapper;

    @GetMapping("/api/admin/orders/{orderId}")
    public OrderDto getOrder(@PathVariable("orderId") Long orderId) {

        Order order = orderService.findById(orderId);

        return orderDtoConverter.convertToOrderDto(order);
    }

    @GetMapping("/api/admin/orders")
    public List<OrderDto> getAllOrders() {

        List<Order> orders = orderService.findAll();
        List<OrderDto> ordersDto = new ArrayList<>();

        for (Order order: orders) {
            ordersDto.add(orderDtoConverter.convertToOrderDto(order));
        }

        return ordersDto;
    }

    @PostMapping("/api/admin/orders/updatestatus")
    public HashMap<String, String> updateOrderStatus(@RequestBody String orderStatusJSON) throws JsonProcessingException {

        HashMap<String, String> returnCode = new HashMap<>();

        OrderStatusDto orderStatusDto = jsonObjectMapper.readValue(orderStatusJSON, OrderStatusDto.class);

        Order order = orderService.findById(orderStatusDto.getOrderId());

        order.setStatus(orderStatusDto.getStatus());

        orderService.save(order);

        returnCode.put("201", "Order status updated");

        return returnCode;
    }
}
