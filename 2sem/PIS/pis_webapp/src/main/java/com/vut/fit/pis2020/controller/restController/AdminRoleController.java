package com.vut.fit.pis2020.controller.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vut.fit.pis2020.converter.RoleDtoConverter;
import com.vut.fit.pis2020.dto.RoleDto;
import com.vut.fit.pis2020.dto.UserRoleDto;
import com.vut.fit.pis2020.entity.Role;
import com.vut.fit.pis2020.entity.User;
import com.vut.fit.pis2020.service.RoleService;
import com.vut.fit.pis2020.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class AdminRoleController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleDtoConverter roleDtoConverter;

    @Autowired
    private ObjectMapper jsonObjectMapper;

    @GetMapping("/api/admin/roles")
    public List<RoleDto> getAllRoles() {

        List<Role> roles = roleService.findAll();
        List<RoleDto> roleDtos = new ArrayList<>();

        for (Role role: roles) {
            roleDtos.add(roleDtoConverter.convertToRoleDto(role));
        }

        return roleDtos;
    }

    @GetMapping("/api/admin/roles/{roleId}")
    public RoleDto getRole(@PathVariable("roleId") Long roleId) {
        Role role = roleService.findById(roleId);

        return roleDtoConverter.convertToRoleDto(role);
    }

    @PostMapping("/api/admin/roles/create")
    public HashMap<String, String> createRole(@RequestBody String roleJSON) throws JsonProcessingException {

        HashMap<String, String> returnCode = new HashMap<>();

        RoleDto roleDto = jsonObjectMapper.readValue(roleJSON, RoleDto.class);

        if(roleService.findByName(roleDto.getName()) != null) {
            returnCode.put("409", "There is already a role with the name provided");

            return returnCode;
        }

        Role role = roleDtoConverter.convertToRole(roleDto);

        roleService.save(role);

        returnCode.put("201", "Role created");

        return returnCode;
    }

    @PostMapping("/api/admin/roles/update")
    public HashMap<String, String> updateRole(@RequestBody String roleJSON) throws JsonProcessingException{

        HashMap<String, String> returnCode = new HashMap<>();

        RoleDto roleDto = jsonObjectMapper.readValue(roleJSON, RoleDto.class);

        Role role = roleService.findById(roleDto.getId());

        if(role == null) {
            returnCode.put("409", "There is no role with this id");

            return returnCode;
        }

        /* Check unique name */
        if(!role.getName().equals(roleDto.getName())) {

            if(roleService.findByName(roleDto.getName()) != null) {
                returnCode.put("409", "There is already a role with the name provided");

                return returnCode;
            }

        }

        role.setName(roleDto.getName());
        roleService.save(role);

        return returnCode;
    }

    /* TODO privileges */

    @PostMapping("/api/admin/users/updaterole")
    public HashMap<String, String> updateUserRole(@RequestBody String roleJSON) throws JsonProcessingException{

        HashMap<String, String> returnCode = new HashMap<>();

        UserRoleDto userRoleDto = jsonObjectMapper.readValue(roleJSON, UserRoleDto.class);

        User user = userService.findById(userRoleDto.getUser_id());
        Role role = roleService.findById(userRoleDto.getRole_id());

        if((user == null) || (role == null)) {
            returnCode.put("409", "There are no role or user provided");

            return returnCode;
        }

        user.setRole(role);
        userService.save(user);

        return returnCode;
    }
}
