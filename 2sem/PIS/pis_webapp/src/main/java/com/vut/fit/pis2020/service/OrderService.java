package com.vut.fit.pis2020.service;

import com.vut.fit.pis2020.entity.Order;
import com.vut.fit.pis2020.entity.OrderItem;
import com.vut.fit.pis2020.entity.User;
import com.vut.fit.pis2020.persistance.OrderItemRepository;
import com.vut.fit.pis2020.persistance.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    public Order findById(Long id) {
        return orderRepository.getOne(id);
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public List<Order> findAllByUser(User user) {
        return orderRepository.findAllByUser(user);
    }

    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public void delete(Order order) {
        orderRepository.delete(order);
    }

    /* OrderItem */

    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public void deleteOrderItem(OrderItem orderItem) {
        orderItemRepository.delete(orderItem);
    }
}
