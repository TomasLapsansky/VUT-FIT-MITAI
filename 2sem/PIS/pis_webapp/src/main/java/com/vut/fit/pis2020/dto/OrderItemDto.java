package com.vut.fit.pis2020.dto;

public class OrderItemDto {

    private Long id;

    private ProductBasicDto productDto;

    private Integer amount;

    private Double price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
