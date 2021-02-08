package com.vut.fit.pis2020.controller.restController;

import com.vut.fit.pis2020.converter.CategoryDtoConverter;
import com.vut.fit.pis2020.converter.ProductDtoConverter;
import com.vut.fit.pis2020.dto.CategoryDto;
import com.vut.fit.pis2020.dto.ProductBasicDto;
import com.vut.fit.pis2020.dto.ProductDetailDto;
import com.vut.fit.pis2020.entity.Category;
import com.vut.fit.pis2020.entity.Product;
import com.vut.fit.pis2020.entity.ProductCategory;
import com.vut.fit.pis2020.service.CategoryService;
import com.vut.fit.pis2020.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductDtoConverter productDtoConverter;

    @Autowired
    private CategoryDtoConverter categoryDtoConverter;

    @GetMapping("/api/products/{productId}")
    public ProductDetailDto getProductDetail(@PathVariable("productId") Long productId) {

        Product product = productService.findById(productId);

        return productDtoConverter.convertToProductDetailDto(product);
    }

    @GetMapping("/api/categories/{categoryId}/products")
    public List<ProductBasicDto> getProductsByCategory(@PathVariable("categoryId") Long categoryId) {

        Category category = categoryService.findById(categoryId);

        if(category == null) {
            //TODO ?
            return null;
        }

        List<ProductBasicDto> productBasicDtos = new ArrayList<>();
        List<Product> products = productService.findAllByCategory(category);

        for (Product product: products) {
            productBasicDtos.add(productDtoConverter.convertToProductBasicDto(product));
        }

        return productBasicDtos;
    }

    @GetMapping("/api/products/discounted")
    public List<ProductBasicDto> getDiscountedProducts() {

        List<ProductBasicDto> productBasicDtos = new ArrayList<>();

        List<Product> discountedProducts = productService.findAllDiscounted();

        for (Product product: discountedProducts) {
            productBasicDtos.add(productDtoConverter.convertToProductBasicDto(product));
        }

        return productBasicDtos;
    }

    @GetMapping("/api/products/new")
    public List<ProductBasicDto> getNewestProducts() {

        List<ProductBasicDto> productBasicDtos = new ArrayList<>();

        List<Product> newestProducts = productService.findNewest();

        for (Product product: newestProducts) {
            productBasicDtos.add(productDtoConverter.convertToProductBasicDto(product));
        }

        return productBasicDtos;
    }

    @GetMapping("/api/products/{productId}/categories")
    public List<CategoryDto> getProductCategories(@PathVariable("productId") Long productId) {

        Product product = productService.findById(productId);

        List<ProductCategory> productCategories = product.getProductCategories();

        List<CategoryDto> categoriesDto = new ArrayList<>();

        for(ProductCategory productCategory: productCategories) {
            categoriesDto.add(categoryDtoConverter.convertToCategoryDto(productCategory.getCategory()));
        }

        return categoriesDto;
    }
}
