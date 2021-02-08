package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.Category;
import com.vut.fit.pis2020.entity.Product;
import com.vut.fit.pis2020.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

    ProductCategory findByProductAndCategory(Product product, Category category);

    List<ProductCategory> findAllByCategory(Category category);
}
