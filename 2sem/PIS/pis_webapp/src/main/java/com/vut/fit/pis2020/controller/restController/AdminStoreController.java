package com.vut.fit.pis2020.controller.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vut.fit.pis2020.converter.StoreDtoConverter;
import com.vut.fit.pis2020.dto.StoreDto;
import com.vut.fit.pis2020.dto.StoreProductDto;
import com.vut.fit.pis2020.entity.Product;
import com.vut.fit.pis2020.entity.Store;
import com.vut.fit.pis2020.entity.StoreEntity;
import com.vut.fit.pis2020.helper.Pair;
import com.vut.fit.pis2020.service.ProductService;
import com.vut.fit.pis2020.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class AdminStoreController {

    @Autowired
    private StoreService storeService;

    @Autowired
    private ProductService productService;

    @Autowired
    private StoreDtoConverter storeDtoConverter;

    @Autowired
    private ObjectMapper jsonObjectMapper;

    @GetMapping("/api/admin/stores")
    public List<StoreDto> getAllStores() {

        List<Store> allStores = storeService.findAll();
        List<StoreDto> allStoresDto = new ArrayList<>();

        for (Store store: allStores) {
            allStoresDto.add(storeDtoConverter.convertToStoreDto(store));
        }

        return allStoresDto;
    }

    @GetMapping("/api/admin/stores/{storeId}")
    public StoreDto getStore(@PathVariable("storeId") Long storeId) {

        Store store = storeService.findById(storeId);

        return storeDtoConverter.convertToStoreDto(store);
    }

    @PostMapping("/api/admin/stores/create")
    public HashMap<String, String> createStore(@RequestBody String storeJSON) throws JsonProcessingException {

        HashMap<String, String> returnCode = new HashMap<>();

        StoreDto storeDto = jsonObjectMapper.readValue(storeJSON, StoreDto.class);

        Store store = storeDtoConverter.convertToStore(storeDto);

        storeService.save(store);

        returnCode.put("201", "Store registered");

        return returnCode;
    }

    @PostMapping("/api/admin/stores/update")
    public HashMap<String, String> updateStore(@RequestBody String storeJSON) throws JsonProcessingException {

        HashMap<String, String> returnCode = new HashMap<>();

        StoreDto storeDto = jsonObjectMapper.readValue(storeJSON, StoreDto.class);

        Store store = storeService.findById(storeDto.getId());

        store.setName(storeDto.getName());
        store.setLocation(storeDto.getLocation());

        storeService.save(store);

        returnCode.put("201", "Store updated");

        return returnCode;
    }

    @GetMapping("/api/admin/products/{productId}/stores")
    public List<Pair<String, StoreDto>> getProductStores(@PathVariable("productId") Long productId) {

        List<Pair<String, StoreDto>> returnCode = new ArrayList<>();

        Product product = productService.findById(productId);

        List<StoreEntity> storeEntities = storeService.findAllStoreEntitiesByProduct(product);
        List<Store> stores = storeService.findAll();

        /* Every store has to has an entity */
        for (Store store: stores) {
            boolean found = false;

            for(StoreEntity storeEntity: storeEntities) {
                if(store == storeEntity.getStore()) {
                    returnCode.add(new Pair<>(Integer.toString(storeEntity.getAmount()), storeDtoConverter.convertToStoreDto(store)));
                    found = true;
                    break;
                }
            }
            if(!found) {
                returnCode.add(new Pair<>("0", storeDtoConverter.convertToStoreDto(store)));
            }
        }

        return returnCode;
    }

    @PostMapping("/api/admin/products/updatestore")
    public HashMap<String, String> updateProductStore(@RequestBody String productStoreJSON) throws JsonProcessingException {

        HashMap<String, String> returnCode = new HashMap<>();

        StoreProductDto storeProductDto = jsonObjectMapper.readValue(productStoreJSON, StoreProductDto.class);

        Product product = productService.findById(storeProductDto.getProductId());
        Store store = storeService.findById(storeProductDto.getStoreId());

        StoreEntity storeEntity = storeService.findStoreEntityByProductByStore(product, store);

        if(storeEntity == null) {
            /* Save new */
            storeEntity = new StoreEntity();
            storeEntity.setProduct(product);
            storeEntity.setStore(store);
        }

        /* Save new amount */
        storeEntity.setAmount(storeProductDto.getAmount());

        storeService.saveStoreEntity(storeEntity);

        returnCode.put("201", "Stored amount updated");

        return returnCode;
    }
}
