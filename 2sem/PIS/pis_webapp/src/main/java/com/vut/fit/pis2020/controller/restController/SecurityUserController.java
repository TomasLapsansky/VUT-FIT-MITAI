package com.vut.fit.pis2020.controller.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vut.fit.pis2020.converter.UserDtoConverter;
import com.vut.fit.pis2020.dto.UserDto;
import com.vut.fit.pis2020.entity.Role;
import com.vut.fit.pis2020.entity.User;
import com.vut.fit.pis2020.security.IAuthenticationFacade;
import com.vut.fit.pis2020.service.RoleService;
import com.vut.fit.pis2020.service.SecurityUserDetailsService;
import com.vut.fit.pis2020.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class SecurityUserController {

    @Autowired
    private ObjectMapper jsonObjectMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserDtoConverter userDtoConverter;

    @Autowired
    private IAuthenticationFacade authenticationFacade;

    @Autowired
    private SecurityUserDetailsService securityUserDetailsService;

    @GetMapping("/api/user/details")
    public UserDto getUser() {
        Authentication authentication = authenticationFacade.getAuthentication();

        User user = userService.findByEmail(authentication.getName());
        UserDto userDto = null;

        if(user == null) {
            userDto = new UserDto();
        } else {
            userDto = userDtoConverter.convertToUserDto(user);
        }

        return userDto;
    }

    @PostMapping("/api/user/register")
    public HashMap<String, String> registerUser(@RequestBody String userJSON) throws JsonProcessingException {

        HashMap<String, String> returnCode = new HashMap<>();

        UserDto userDto = jsonObjectMapper.readValue(userJSON, UserDto.class);

        if(userService.findByEmail(userDto.getEmail()) != null) {
            returnCode.put("409", "There is already a user registered with the email provided");

            return returnCode;
        }

        User user = userDtoConverter.convertToUser(userDto);

        Role basicRole = roleService.findByName("user");
        user.setRole(basicRole);

        userService.save(user);

        returnCode.put("201", "User registered");

        return returnCode;
    }
}
