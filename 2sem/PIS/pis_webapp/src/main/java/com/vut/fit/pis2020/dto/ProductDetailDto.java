package com.vut.fit.pis2020.dto;

import com.vut.fit.pis2020.helper.Pair;

import java.util.List;

public class ProductDetailDto {

    private Long id;

    private String name;

    private String specification;

    private String description;

    private Double price;

    private Double priceTax;

    private Boolean inDiscount;

    private Double beforeDiscountPrice;

    private Boolean available;

    private List<ProductPhotoDto> photos;

    private List<Pair<String, StoreDto>> storesCapacity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getPriceTax() {
        return priceTax;
    }

    public void setPriceTax(Double priceTax) {
        this.priceTax = priceTax;
    }

    public Boolean getInDiscount() {
        return inDiscount;
    }

    public void setInDiscount(Boolean inDiscount) {
        this.inDiscount = inDiscount;
    }

    public Double getBeforeDiscountPrice() {
        return beforeDiscountPrice;
    }

    public void setBeforeDiscountPrice(Double beforeDiscountPrice) {
        this.beforeDiscountPrice = beforeDiscountPrice;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public List<ProductPhotoDto> getPhotos() {
        return photos;
    }

    public void setPhotos(List<ProductPhotoDto> photos) {
        this.photos = photos;
    }

    public List<Pair<String, StoreDto>> getStoresCapacity() {
        return storesCapacity;
    }

    public void setStoresCapacity(List<Pair<String, StoreDto>> storesCapacity) {
        this.storesCapacity = storesCapacity;
    }
}
