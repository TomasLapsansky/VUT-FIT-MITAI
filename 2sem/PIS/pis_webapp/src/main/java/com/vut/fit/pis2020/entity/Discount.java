package com.vut.fit.pis2020.entity;

import com.vut.fit.pis2020.converter.LocalDateTimeConverter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "discount")
@EntityListeners(AuditingEntityListener.class)
public class Discount implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", updatable = false)
    private Long id;

    @NotNull
    @Column(name = "type")
    private Integer type;

    @NotNull
    @Column(name = "value")
    private Double value;

    @NotNull
    @Column(name = "time_from")
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime timeFrom;

    @NotNull
    @Column(name = "time_to")
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime timeTo;

    @OneToMany(mappedBy = "discount")
    private List<ProductDiscount> productDiscounts;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public LocalDateTime getTimeFrom() {
        return timeFrom;
    }

    public void setTimeFrom(LocalDateTime timeFrom) {
        this.timeFrom = timeFrom;
    }

    public LocalDateTime getTimeTo() {
        return timeTo;
    }

    public void setTimeTo(LocalDateTime timeTo) {
        this.timeTo = timeTo;
    }

    public List<ProductDiscount> getProductDiscounts() {
        return productDiscounts;
    }

    public void setProductDiscounts(List<ProductDiscount> productDiscounts) {
        this.productDiscounts = productDiscounts;
    }
}
