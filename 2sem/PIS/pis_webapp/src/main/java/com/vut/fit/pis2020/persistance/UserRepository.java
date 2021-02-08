package com.vut.fit.pis2020.persistance;

import com.vut.fit.pis2020.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User getOne(Long id);
    User findByEmail(String email);
}
