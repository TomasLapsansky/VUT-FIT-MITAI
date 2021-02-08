package com.vut.fit.pis2020.converter;

import com.vut.fit.pis2020.dto.OrderCheckoutDto;
import com.vut.fit.pis2020.dto.OrderDto;
import com.vut.fit.pis2020.dto.OrderItemDto;
import com.vut.fit.pis2020.entity.CartItem;
import com.vut.fit.pis2020.entity.Order;
import com.vut.fit.pis2020.entity.OrderItem;
import com.vut.fit.pis2020.entity.User;
import com.vut.fit.pis2020.persistance.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OrderDtoConverter {

    @Autowired
    private UserDtoConverter userDtoConverter;

    @Autowired
    private ProductDtoConverter productDtoConverter;

    public OrderDto convertToOrderDto(Order order) {
        OrderDto orderDto = null;

        if(order != null) {
            orderDto = new OrderDto();
            orderDto.setId(order.getId());
            orderDto.setStatus(order.getStatus());
            orderDto.setCity(order.getCity());
            orderDto.setCode(order.getCode());
            orderDto.setAddress(order.getAddress());
            orderDto.setNote(order.getNote());

            orderDto.setUser(userDtoConverter.convertToUserDto(order.getUser()));

            List<OrderItem> orderItems = order.getOrderItems();
            List<OrderItemDto> orderItemsDto = new ArrayList<>();
            for(OrderItem orderItem: orderItems) {
                orderItemsDto.add(convertOrderItemOrderToItemDto(orderItem));
            }
            orderDto.setOrderItemsDto(orderItemsDto);
        }

        return orderDto;
    }

    public OrderItemDto convertOrderItemOrderToItemDto(OrderItem orderItem) {
        OrderItemDto orderItemDto = null;

        if(orderItem != null) {
            orderItemDto = new OrderItemDto();
            orderItemDto.setId(orderItem.getId());
            orderItemDto.setAmount(orderItem.getAmount());
            orderItemDto.setPrice(orderItem.getPrice());
            orderItemDto.setProductDto(productDtoConverter.convertToProductBasicDto(orderItem.getProduct()));
        }

        return orderItemDto;
    }

    public Order convertOrderCheckoutDtoToOrder(OrderCheckoutDto orderCheckoutDto) {
        Order order = null;

        if(orderCheckoutDto != null) {
            order = new Order();
            order.setCity(orderCheckoutDto.getCity());
            order.setCode(orderCheckoutDto.getCode());
            order.setAddress(orderCheckoutDto.getAddress());
            order.setNote(orderCheckoutDto.getNote());
            order.setStatus(1); /* Default */
        }

        return order;
    }

    public OrderItem convertCartItemToOrderItem(CartItem cartItem, Order order) {
        OrderItem orderItem = null;

        if(cartItem != null) {
            orderItem = new OrderItem();
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItem.setAmount(cartItem.getAmount());
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setOrder(order);
        }

        return orderItem;
    }
}
