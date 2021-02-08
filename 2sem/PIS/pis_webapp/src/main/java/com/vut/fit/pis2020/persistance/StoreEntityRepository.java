package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.Product;
import com.vut.fit.pis2020.entity.Store;
import com.vut.fit.pis2020.entity.StoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreEntityRepository extends JpaRepository<StoreEntity, Long> {

    List<StoreEntity> findAllByProduct(Product product);

    StoreEntity findByProductAndStore(Product product, Store store);
}
