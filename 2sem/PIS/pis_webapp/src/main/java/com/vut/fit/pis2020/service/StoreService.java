package com.vut.fit.pis2020.service;

import com.vut.fit.pis2020.entity.Product;
import com.vut.fit.pis2020.entity.Store;
import com.vut.fit.pis2020.entity.StoreEntity;
import com.vut.fit.pis2020.persistance.StoreEntityRepository;
import com.vut.fit.pis2020.persistance.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private StoreEntityRepository storeEntityRepository;

    public Store findById(Long id) {
        return storeRepository.getOne(id);
    }

    public List<Store> findAll() {
        return storeRepository.findAll();
    }

    public Store save(Store store) {
        return storeRepository.save(store);
    }

    public void delete(Store store) {
        storeRepository.delete(store);
    }

    /* Store entity */

    public List<StoreEntity> findAllStoreEntitiesByProduct(Product product) {
        return storeEntityRepository.findAllByProduct(product);
    }

    public StoreEntity findStoreEntityByProductByStore(Product product, Store store) {
        return storeEntityRepository.findByProductAndStore(product, store);
    }

    public  StoreEntity saveStoreEntity(StoreEntity storeEntity) {
        return storeEntityRepository.save(storeEntity);
    }
}
