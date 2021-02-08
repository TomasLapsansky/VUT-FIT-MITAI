package com.vut.fit.pis2020.dto;

public class CartItemProductDto {

    private Long id;

    private Long userId;

    private ProductBasicDto productDto;

    private Integer amount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public ProductBasicDto getProductDto() {
        return productDto;
    }

    public void setProductDto(ProductBasicDto productDto) {
        this.productDto = productDto;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
