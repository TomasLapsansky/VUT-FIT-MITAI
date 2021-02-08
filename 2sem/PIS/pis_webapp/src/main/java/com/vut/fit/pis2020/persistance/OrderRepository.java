package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.Order;
import com.vut.fit.pis2020.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByUser(User user);
}
