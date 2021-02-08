package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByParentCategory(Category category);
}
