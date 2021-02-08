package com.vut.fit.pis2020.controller.restController;

import com.vut.fit.pis2020.converter.CategoryDtoConverter;
import com.vut.fit.pis2020.dto.CategoryDto;
import com.vut.fit.pis2020.entity.Category;
import com.vut.fit.pis2020.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryDtoConverter categoryDtoConverter;

    @GetMapping("/api/categories/main")
    public List<CategoryDto> getMainCategories() {

        List<CategoryDto> allMainCategoriesDto = new ArrayList<>();
        List<Category> allMainCategories = categoryService.findAllByParent(null);

        for (Category category: allMainCategories) {
            allMainCategoriesDto.add(categoryDtoConverter.convertToCategoryDto(category));
        }

        return allMainCategoriesDto;
    }

    @GetMapping("/api/categories/{categoryId}/subcategories")
    public List<CategoryDto> getChildCategories(@PathVariable("categoryId") Long categoryId) {

        Category mainCategory = categoryService.findById(categoryId);

        if(mainCategory == null) {
            return null;
        }

        List<CategoryDto> childCategoriesDto = new ArrayList<>();
        List<Category> childCategories = categoryService.findAllByParent(mainCategory);

        for (Category category: childCategories) {
            childCategoriesDto.add(categoryDtoConverter.convertToCategoryDto(category));
        }

        return childCategoriesDto;
    }
}
