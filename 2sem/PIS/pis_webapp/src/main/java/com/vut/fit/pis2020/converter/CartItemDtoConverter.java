package com.vut.fit.pis2020.converter;

import com.vut.fit.pis2020.dto.CartItemDto;
import com.vut.fit.pis2020.dto.CartItemProductDto;
import com.vut.fit.pis2020.entity.CartItem;
import com.vut.fit.pis2020.service.CartItemService;
import com.vut.fit.pis2020.service.ProductService;
import com.vut.fit.pis2020.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartItemDtoConverter {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductDtoConverter productDtoConverter;

    public CartItem convertToCartItem(CartItemDto cartItemDto) {
        CartItem cartItem = null;

        if(cartItemDto != null) {
            cartItem = new CartItem();
            cartItem.setProduct(productService.findById(cartItemDto.getProductId()));
            cartItem.setUser(userService.findById(cartItemDto.getUserId()));
            cartItem.setAmount(cartItemDto.getAmount());
        }

        return cartItem;
    }

    public CartItemProductDto convertToCartItemProductDto(CartItem cartItem) {
        CartItemProductDto cartItemProductDto = null;

        if(cartItem != null) {
            cartItemProductDto = new CartItemProductDto();
            cartItemProductDto.setId(cartItem.getId());
            cartItemProductDto.setAmount(cartItem.getAmount());
            cartItemProductDto.setUserId(cartItem.getUser().getId());
            cartItemProductDto.setProductDto(productDtoConverter.convertToProductBasicDto(cartItem.getProduct()));
        }

        return cartItemProductDto;
    }
}
