package com.vut.fit.pis2020.service;

import com.vut.fit.pis2020.entity.Role;
import com.vut.fit.pis2020.persistance.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role findById(Long id) {
        return roleRepository.getOne(id);
    }

    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public Role save(Role role) {
        return roleRepository.save(role);
    }

    public void delete(Role role) {
        roleRepository.delete(role);
    }
}
