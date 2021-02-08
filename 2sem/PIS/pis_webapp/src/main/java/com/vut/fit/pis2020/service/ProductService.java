package com.vut.fit.pis2020.service;

import com.vut.fit.pis2020.entity.Category;
import com.vut.fit.pis2020.entity.Product;
import com.vut.fit.pis2020.entity.ProductCategory;
import com.vut.fit.pis2020.entity.ProductPhoto;
import com.vut.fit.pis2020.persistance.ProductCategoryRepository;
import com.vut.fit.pis2020.persistance.ProductPhotoRepository;
import com.vut.fit.pis2020.persistance.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductPhotoRepository productPhotoRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public Product findById(Long id) {
        return productRepository.getOne(id);
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public void delete(Product product) {
        productRepository.delete(product);
    }

    /* Photos */

    public List<ProductPhoto> findPhotosByProduct(Long id) {
        Product product = productRepository.getOne(id);

        return productPhotoRepository.findByProduct(product);
    }

    public ProductPhoto findPhotoById(Long id) {
        return productPhotoRepository.getOne(id);
    }

    public ProductPhoto savePhoto(ProductPhoto productPhoto) {
        return productPhotoRepository.save(productPhoto);
    }

    public void deletePhoto(ProductPhoto productPhoto) {
        productPhotoRepository.delete(productPhoto);
    }

    /* Frontend */

    public List<Product> findAllAvailable() {
        return productRepository.findAllByAvailableTrue();
    }

    public List<Product> findAllByCategory(Category category) {

        List<ProductCategory> productCategories = productCategoryRepository.findAllByCategory(category);
        List<Product> products = new ArrayList<>();

        for(ProductCategory productCategory: productCategories) {
            if(productCategory.getProduct().getAvailable()) {
                products.add(productCategory.getProduct());
            }
        }

        for (Category childCategory: category.getChildCategories()) {
            products.addAll(findAllByCategory(childCategory));
        }

        return products;
    }

    public List<Product> findAllDiscounted() {
        // TODO
        return null;
    }

    public List<Product> findNewest() {
        List<Product> products = productRepository.findAllByOrderByCreatedDesc();
        int cnt = 8;
        List<Product> returnProducts = new ArrayList<>();

        for (Product product: products) {
            if(product.getAvailable()) {
                returnProducts.add(product);
                cnt--;
            }
            if(cnt == 0) {
                break;
            }
        }

        return returnProducts;
    }
}
