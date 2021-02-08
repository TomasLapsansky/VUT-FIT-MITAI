package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {

    Store getOne(Long id);
}
