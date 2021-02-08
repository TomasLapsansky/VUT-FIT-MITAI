package com.vut.fit.pis2020.converter;

import com.vut.fit.pis2020.dto.StoreDto;
import com.vut.fit.pis2020.entity.Store;
import org.springframework.stereotype.Component;

@Component
public class StoreDtoConverter {

    public Store convertToStore(StoreDto storeDto) {
        Store store = null;

        if(storeDto != null) {
            store = new Store();
            store.setName(storeDto.getName());
            store.setLocation(storeDto.getLocation());
        }

        return store;
    }

    public StoreDto convertToStoreDto(Store store) {
        StoreDto storeDto = null;

        if(store != null) {
            storeDto = new StoreDto();
            storeDto.setId(store.getId());
            storeDto.setName(store.getName());
            storeDto.setLocation(store.getLocation());
        }

        return storeDto;
    }
}
