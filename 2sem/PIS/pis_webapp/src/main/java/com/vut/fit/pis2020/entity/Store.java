package com.vut.fit.pis2020.entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "store")
@EntityListeners(AuditingEntityListener.class)
public class Store implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false)
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @Size(max = 255)
    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "store")
    private List<StoreEntity> storeEntities;

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<StoreEntity> getStoreEntities() {
        return storeEntities;
    }

    public void setStoreEntities(List<StoreEntity> storeEntities) {
        this.storeEntities = storeEntities;
    }
}
