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
@Table(name = "product")
@EntityListeners(AuditingEntityListener.class)
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false)
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @Column(name = "specification", columnDefinition = "TEXT")
    private String specification;

    @NotNull
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull
    @Column(name = "price")
    private Double price;

    @NotNull
    @Column(name = "available")
    private Boolean available;

    @CreatedDate
    @Column(name = "created", updatable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime created;

    @Column(name = "num_buys")
    private Integer numBuys = 0;

    @OneToMany(mappedBy = "product")
    private List<StoreEntity> storeEntities;

    @OneToMany(mappedBy = "product")
    private List<ProductCategory> productCategories;

    @OneToMany(mappedBy = "product")
    private List<ProductPhoto> productPhotos;

    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItems;

    @OneToMany(mappedBy = "product")
    private List<ProductFavorite> productFavorites;

    @OneToMany(mappedBy = "product")
    private List<ProductDiscount> productDiscounts;

    @OneToMany(mappedBy = "product")
    private List<OrderItem> orderItems;

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

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public List<StoreEntity> getStoreEntities() {
        return storeEntities;
    }

    public void setStoreEntities(List<StoreEntity> storeEntities) {
        this.storeEntities = storeEntities;
    }

    public List<ProductCategory> getProductCategories() {
        return productCategories;
    }

    public void setProductCategories(List<ProductCategory> productCategories) {
        this.productCategories = productCategories;
    }

    public List<ProductPhoto> getProductPhotos() {
        return productPhotos;
    }

    public void setProductPhotos(List<ProductPhoto> productPhotos) {
        this.productPhotos = productPhotos;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public List<ProductFavorite> getProductFavorites() {
        return productFavorites;
    }

    public void setProductFavorites(List<ProductFavorite> productFavorites) {
        this.productFavorites = productFavorites;
    }

    public List<ProductDiscount> getProductDiscounts() {
        return productDiscounts;
    }

    public void setProductDiscounts(List<ProductDiscount> productDiscounts) {
        this.productDiscounts = productDiscounts;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public Integer getNumBuys() {
        return numBuys;
    }

    public void setNumBuys(Integer numBuys) {
        this.numBuys = numBuys;
    }
}
