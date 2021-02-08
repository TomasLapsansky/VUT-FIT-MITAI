package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.Product;
import com.vut.fit.pis2020.entity.ProductPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductPhotoRepository extends JpaRepository<ProductPhoto, Long> {

    List<ProductPhoto> findByProduct(Product product);
}
