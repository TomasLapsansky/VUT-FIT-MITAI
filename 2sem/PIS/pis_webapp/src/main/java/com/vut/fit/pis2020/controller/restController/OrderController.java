package com.vut.fit.pis2020.controller.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vut.fit.pis2020.converter.OrderDtoConverter;
import com.vut.fit.pis2020.dto.OrderCheckoutDto;
import com.vut.fit.pis2020.dto.OrderDto;
import com.vut.fit.pis2020.entity.CartItem;
import com.vut.fit.pis2020.entity.Order;
import com.vut.fit.pis2020.entity.OrderItem;
import com.vut.fit.pis2020.entity.User;
import com.vut.fit.pis2020.security.IAuthenticationFacade;
import com.vut.fit.pis2020.service.CartItemService;
import com.vut.fit.pis2020.service.OrderService;
import com.vut.fit.pis2020.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private OrderDtoConverter orderDtoConverter;

    @Autowired
    private ObjectMapper jsonObjectMapper;

    @Autowired
    private IAuthenticationFacade authenticationFacade;

    @GetMapping("/api/user/orders")
    public List<OrderDto> getUserOrders() {

        Authentication authentication = authenticationFacade.getAuthentication();

        User user = userService.findByEmail(authentication.getName());

        List<Order> orders = orderService.findAllByUser(user);

        List<OrderDto> ordersDto = new ArrayList<>();

        for(Order order: orders) {
            ordersDto.add(orderDtoConverter.convertToOrderDto(order));
        }

        return ordersDto;
    }

    @GetMapping("/api/user/orders/{orderId}")
    public OrderDto getOrder(@PathVariable("orderId") Long orderId) {

        Authentication authentication = authenticationFacade.getAuthentication();

        User user = userService.findByEmail(authentication.getName());

        Order order = orderService.findById(orderId);

        if(order.getUser() != user) {
            return null;
        }

        return orderDtoConverter.convertToOrderDto(order);
    }

    @PostMapping("/api/order/checkout")
    @ResponseBody
    public HashMap<String, Long> checkoutOrder(@RequestBody String orderJSON) throws JsonProcessingException {

        HashMap<String, Long> returnCode = new HashMap<>();

        OrderCheckoutDto orderCheckoutDto = jsonObjectMapper.readValue(orderJSON, OrderCheckoutDto.class);

        Authentication authentication = authenticationFacade.getAuthentication();

        User user = userService.findByEmail(authentication.getName());

        Order order = orderDtoConverter.convertOrderCheckoutDtoToOrder(orderCheckoutDto);
        order.setUser(user);

        order = orderService.save(order);

        List<CartItem> cartItems = cartItemService.getByUser(user.getId()); // Hmmm?

        for(CartItem cartItem: cartItems) {
            OrderItem orderItem = orderDtoConverter.convertCartItemToOrderItem(cartItem, order);
            orderService.saveOrderItem(orderItem);
            cartItemService.delete(cartItem);
        }

        returnCode.put("responseCode", (long) 201);
        returnCode.put("id", order.getId());

        return returnCode;
    }
}
