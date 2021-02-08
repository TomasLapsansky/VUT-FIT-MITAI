package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
