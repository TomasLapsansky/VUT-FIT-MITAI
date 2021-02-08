package com.vut.fit.pis2020.converter;

import com.vut.fit.pis2020.dto.CategoryDto;
import com.vut.fit.pis2020.entity.Category;
import com.vut.fit.pis2020.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CategoryDtoConverter {

    @Autowired
    private CategoryService categoryService;

    public Category convertToCategory(CategoryDto categoryDto) {
        Category category = null;

        if(categoryDto != null) {
            category = new Category();
            category.setName(categoryDto.getName());
            category.setDescription(categoryDto.getDescription());
            if(categoryDto.getParentCategoryId() == null) {
                category.setParentCategory(null);
            } else {
                category.setParentCategory(categoryService.findById(categoryDto.getParentCategoryId()));
            }
        }

        return category;
    }

    public CategoryDto convertToCategoryDto(Category category) {
        CategoryDto categoryDto = null;

        if(category != null) {
            categoryDto = new CategoryDto();
            categoryDto.setId(category.getId());
            categoryDto.setName(category.getName());
            categoryDto.setDescription(category.getDescription());
            if(category.getParentCategory() != null) {
                categoryDto.setParentCategoryId(category.getParentCategory().getId());
            } else {
                categoryDto.setParentCategoryId(null);
            }
        }

        return categoryDto;
    }
}
