package com.vut.fit.pis2020.service;

import com.vut.fit.pis2020.entity.CartItem;
import com.vut.fit.pis2020.entity.User;
import com.vut.fit.pis2020.persistance.CartItemRepository;
import com.vut.fit.pis2020.persistance.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    public CartItem findById(Long id) {
        return cartItemRepository.getOne(id);
    }

    public List<CartItem> getByUser(Long id) {
        User user = userRepository.getOne(id);

        if(user == null) {
            return new ArrayList<>();
        }

        return cartItemRepository.findAllByUser(user);
    }

    public CartItem getSame(Long userId, Long productId) {
        User user = userRepository.getOne(userId);

        if(user == null) {
            return null;
        }

        List<CartItem> cartItems = cartItemRepository.findAllByUser(user);

        for (CartItem cartItem: cartItems) {
            if(cartItem.getProduct().getId().equals(productId)) {
                return cartItem;
            }
        }

        return null;
    }

    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    public void delete(CartItem cartItem) {
        cartItemRepository.delete(cartItem);
    }
}
