package com.vut.fit.pis2020.controller.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vut.fit.pis2020.converter.CartItemDtoConverter;
import com.vut.fit.pis2020.dto.CartItemDto;
import com.vut.fit.pis2020.dto.CartItemProductDto;
import com.vut.fit.pis2020.entity.CartItem;
import com.vut.fit.pis2020.service.CartItemService;
import com.vut.fit.pis2020.service.ProductService;
import com.vut.fit.pis2020.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemDtoConverter cartItemDtoConverter;

    @GetMapping("/api/cartitems/{userId}")
    public List<CartItemProductDto> getUserCartItems(@PathVariable("userId") Long userId) {

        List<CartItem> cartItems = cartItemService.getByUser(userId);

        List<CartItemProductDto> cartItemProductDtos = new ArrayList<>();

        for (CartItem cartItem: cartItems) {
            cartItemProductDtos.add(cartItemDtoConverter.convertToCartItemProductDto(cartItem));
        }

        return cartItemProductDtos;
    }

    @PostMapping("/api/cartitems/add")
    public HashMap<String, String> addCartItem(@RequestBody String cartItemJSON) throws JsonProcessingException {
        HashMap<String, String> returnCode = new HashMap<>();

        ObjectMapper mapper = new ObjectMapper();
        CartItemDto cartItemDto = mapper.readValue(cartItemJSON, CartItemDto.class);

        if(userService.findById(cartItemDto.getUserId()) == null) {
            returnCode.put("409", "There is no user with this id");

            return returnCode;
        }

        if(productService.findById(cartItemDto.getProductId()) == null) {
            returnCode.put("409", "There is no product with this id");

            return returnCode;
        }

        CartItem oldCartItem = cartItemService.getSame(cartItemDto.getUserId(), cartItemDto.getProductId());

        if(oldCartItem == null) {
            CartItem cartItem = cartItemDtoConverter.convertToCartItem(cartItemDto);
            cartItemService.save(cartItem);
        } else {
            /* Only update existing by amount */
            oldCartItem.setAmount(oldCartItem.getAmount() + cartItemDto.getAmount());
            cartItemService.save(oldCartItem);
        }

        returnCode.put("201", "Product item added to cart");

        return returnCode;
    }

    @DeleteMapping("/api/cartitems/delete/{id}")
    public HashMap<String, String> deleteCartItem(@PathVariable("id") Long cartItemId) {

        HashMap<String, String> returnCode = new HashMap<>();

        CartItem cartItem = cartItemService.findById(cartItemId);

        if(cartItem == null) {
            returnCode.put("409", "There is no cartItem with this id");

            return returnCode;
        }

        cartItemService.delete(cartItem);

        returnCode.put("201", "CartItem deleted");

        return returnCode;
    }
}
