package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.CartItem;
import com.vut.fit.pis2020.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findAllByUser(User user);
}
