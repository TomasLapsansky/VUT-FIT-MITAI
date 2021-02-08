package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
