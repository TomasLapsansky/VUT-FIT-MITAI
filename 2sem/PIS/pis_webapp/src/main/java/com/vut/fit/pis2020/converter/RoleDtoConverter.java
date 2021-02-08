package com.vut.fit.pis2020.converter;

import com.vut.fit.pis2020.dto.RoleDto;
import com.vut.fit.pis2020.entity.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleDtoConverter {

    public Role convertToRole(RoleDto roleDto) {
        Role role = null;

        if(roleDto != null) {
            role = new Role();
            role.setName(roleDto.getName());
        }

        return role;
    }

    public RoleDto convertToRoleDto(Role role) {
        RoleDto roleDto = null;

        if(role != null) {
            roleDto = new RoleDto();
            roleDto.setId(role.getId());
            roleDto.setName(role.getName());
        }

        return roleDto;
    }
}
