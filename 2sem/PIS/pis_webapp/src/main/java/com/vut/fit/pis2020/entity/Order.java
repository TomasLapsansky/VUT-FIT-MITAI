package com.vut.fit.pis2020.entity;

import com.vut.fit.pis2020.converter.LocalDateTimeConverter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user_order")
@EntityListeners(AuditingEntityListener.class)
public class Order implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", updatable = false)
    private Long id;

    @NotNull
    @Column(name = "status")
    private Integer status;

    @NotNull
    @Size(max = 255)
    @Column(name = "city")
    private String city;

    @NotNull
    @Size(max = 15)
    @Column(name = "code")
    private String code;

    @NotNull
    @Size(max = 255)
    @Column(name = "address")
    private String address;

    @Size(max = 1023)
    @Column(name = "note")
    private String note;

    @CreatedDate
    @Column(name = "date", updatable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;

    @OneToMany(mappedBy = "order")
    private List<OrderRMA> orderRMAs;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public List<OrderRMA> getOrderRMAs() {
        return orderRMAs;
    }

    public void setOrderRMAs(List<OrderRMA> orderRMAs) {
        this.orderRMAs = orderRMAs;
    }
}
