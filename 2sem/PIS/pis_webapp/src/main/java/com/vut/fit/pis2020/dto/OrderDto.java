package com.vut.fit.pis2020.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    private Long id;

    private Integer status;

    private String city;

    private String code;

    private String address;

    private String note;

    private LocalDateTime date;

    private UserDto user;

    private List<OrderItemDto> orderItemsDto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public List<OrderItemDto> getOrderItemsDto() {
        return orderItemsDto;
    }

    public void setOrderItemsDto(List<OrderItemDto> orderItemsDto) {
        this.orderItemsDto = orderItemsDto;
    }
}
