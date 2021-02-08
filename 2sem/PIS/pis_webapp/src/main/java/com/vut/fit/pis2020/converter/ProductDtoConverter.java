package com.vut.fit.pis2020.converter;

import com.vut.fit.pis2020.dto.*;
import com.vut.fit.pis2020.entity.Product;
import com.vut.fit.pis2020.entity.ProductPhoto;
import com.vut.fit.pis2020.entity.Store;
import com.vut.fit.pis2020.entity.StoreEntity;
import com.vut.fit.pis2020.helper.Pair;
import com.vut.fit.pis2020.service.ProductService;
import com.vut.fit.pis2020.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductDtoConverter {

    @Autowired
    private ProductService productService;

    @Autowired
    private StoreService storeService;

    @Autowired
    private StoreDtoConverter storeDtoConverter;

    public Product convertToProduct(ProductDto productDto) {
        Product product = null;

        if(productDto != null) {
            product = new Product();
            product.setName(productDto.getName());
            product.setSpecification(productDto.getSpecification());
            product.setDescription(productDto.getDescription());
            product.setPrice(productDto.getPrice());
            product.setAvailable(productDto.getAvailable());
        }

        return product;
    }

    public ProductDto convertToProductDto(Product product) {
        ProductDto productDto = null;

        if(product != null) {
            productDto = new ProductDto();
            productDto.setId(product.getId());
            productDto.setName(product.getName());
            productDto.setSpecification(product.getSpecification());
            productDto.setDescription(product.getDescription());
            productDto.setPrice(product.getPrice());    // TODO
            productDto.setPriceTax(product.getPrice() * 1.20); // TAX
            productDto.setInDiscount(false);    // TODO
            productDto.setBeforeDiscountPrice(null);
            productDto.setAvailable(product.getAvailable());

            List<ProductPhoto> productPhotos = productService.findPhotosByProduct(product.getId());

            List<Long> productPhotoIds = new ArrayList<>();
            for (ProductPhoto productPhoto: productPhotos) {
                productPhotoIds.add(productPhoto.getId());
            }
            productDto.setPhotoIds(productPhotoIds);
        }

        return productDto;
    }

    public ProductDetailDto convertToProductDetailDto(Product product) {
        ProductDetailDto productDetailDto = null;

        if(product != null) {
            productDetailDto = new ProductDetailDto();
            productDetailDto.setId(product.getId());
            productDetailDto.setName(product.getName());
            productDetailDto.setSpecification(product.getSpecification());
            productDetailDto.setDescription(product.getDescription());
            productDetailDto.setPrice(product.getPrice());    // TODO
            productDetailDto.setPriceTax(product.getPrice() * 1.20); // TAX
            productDetailDto.setInDiscount(false);    // TODO
            productDetailDto.setBeforeDiscountPrice(null);
            productDetailDto.setAvailable(product.getAvailable());

            List<ProductPhoto> productPhotos = productService.findPhotosByProduct(product.getId());

            List<ProductPhotoDto> productPhotosDto = new ArrayList<>();
            for (ProductPhoto productPhoto: productPhotos) {
                productPhotosDto.add(convertToProductPhotoDto(productPhoto));
            }
            productDetailDto.setPhotos(productPhotosDto);

            /* TODO? Duplicity */
            List<Pair<String, StoreDto>> productStoresCapacity = new ArrayList<>();

            List<StoreEntity> storeEntities = storeService.findAllStoreEntitiesByProduct(product);
            List<Store> stores = storeService.findAll();

            /* Every store has to has an entity */
            for (Store store: stores) {
                boolean found = false;

                for(StoreEntity storeEntity: storeEntities) {
                    if(store == storeEntity.getStore()) {
                        productStoresCapacity.add(new Pair<>(Integer.toString(storeEntity.getAmount()), storeDtoConverter.convertToStoreDto(store)));
                        found = true;
                        break;
                    }
                }
                if(!found) {
                    productStoresCapacity.add(new Pair<>("0", storeDtoConverter.convertToStoreDto(store)));
                }
            }
            /* End */

            productDetailDto.setStoresCapacity(productStoresCapacity);
        }

        return productDetailDto;
    }

    public ProductBasicDto convertToProductBasicDto(Product product) {
        ProductBasicDto productBasicDto = null;

        if(product != null) {
            productBasicDto = new ProductBasicDto();
            productBasicDto.setId(product.getId());
            productBasicDto.setName(product.getName());
            productBasicDto.setPrice(product.getPrice());    // TODO
            productBasicDto.setInDiscount(false);    // TODO
            productBasicDto.setAvailable(product.getAvailable());

            List<ProductPhoto> productPhotos = productService.findPhotosByProduct(product.getId());

            if(!productPhotos.isEmpty()) {
                productBasicDto.setPrimaryPhoto(convertToProductPhotoDto(productPhotos.get(0)));
            }
        }

        return productBasicDto;
    }

    public ProductPhotoDto convertToProductPhotoDto(ProductPhoto productPhoto) {
        ProductPhotoDto productPhotoDto = null;

        if(productPhoto != null) {
            productPhotoDto = new ProductPhotoDto();
            productPhotoDto.setId(productPhoto.getId());
            productPhotoDto.setName(productPhoto.getName());
            productPhotoDto.setDescription(productPhoto.getDescription());
            productPhotoDto.setFile(productPhoto.getFile());
            productPhotoDto.setProductId(productPhoto.getProduct().getId());
        }

        return productPhotoDto;
    }

    public ProductPhoto convertToProductPhoto(ProductPhotoDto productPhotoDto) {
        ProductPhoto productPhoto = null;

        if(productPhotoDto != null) {
            productPhoto = new ProductPhoto();
            productPhoto.setName(productPhotoDto.getName());
            productPhoto.setDescription(productPhotoDto.getDescription());
            productPhoto.setFile(productPhotoDto.getFile());
            productPhoto.setProduct(productService.findById(productPhotoDto.getProductId()));
        }

        return productPhoto;
    }
}
