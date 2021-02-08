package com.vut.fit.pis2020.dto;

public class ProductBasicDto {

    private Long id;

    private String name;

    private Double price;

    private Boolean inDiscount;

    private Boolean available;

    private ProductPhotoDto primaryPhoto;

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getInDiscount() {
        return inDiscount;
    }

    public void setInDiscount(Boolean inDiscount) {
        this.inDiscount = inDiscount;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public ProductPhotoDto getPrimaryPhoto() {
        return primaryPhoto;
    }

    public void setPrimaryPhoto(ProductPhotoDto primaryPhoto) {
        this.primaryPhoto = primaryPhoto;
    }
}
