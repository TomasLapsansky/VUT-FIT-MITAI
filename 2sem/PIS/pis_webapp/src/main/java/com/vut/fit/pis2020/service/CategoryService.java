package com.vut.fit.pis2020.service;

import com.vut.fit.pis2020.entity.Category;
import com.vut.fit.pis2020.entity.Product;
import com.vut.fit.pis2020.entity.ProductCategory;
import com.vut.fit.pis2020.persistance.CategoryRepository;
import com.vut.fit.pis2020.persistance.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public Category findById(Long id) {
        return categoryRepository.getOne(id);
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public void delete(Category category) {
        categoryRepository.delete(category);
    }

    public ProductCategory findProductCategoryConnection(Product product, Category category) {
        return productCategoryRepository.findByProductAndCategory(product, category);
    }

    public List<Category> findAllByParent(Category parent) {
        return categoryRepository.findAllByParentCategory(parent);
    }

    /* Product category connection */

    public ProductCategory getProductCategory(Long id) {
        return productCategoryRepository.getOne(id);
    }

    public ProductCategory addProductToCategory(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }

    public void removeProductFromCategory(ProductCategory productCategory) {
        productCategoryRepository.delete(productCategory);
    }
}
