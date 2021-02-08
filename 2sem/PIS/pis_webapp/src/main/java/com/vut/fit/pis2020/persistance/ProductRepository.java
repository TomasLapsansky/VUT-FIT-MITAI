package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByAvailableTrue();

    Product findByIdAndAvailableTrue(Long id);

    List<Product> findAllByOrderByCreatedDesc();
}
