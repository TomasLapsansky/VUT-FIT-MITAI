package com.vut.fit.pis2020.converter;

import com.vut.fit.pis2020.dto.UserDto;
import com.vut.fit.pis2020.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDtoConverter {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User convertToUser(UserDto userDto) {
        User user = null;

        if(userDto != null) {
            user = new User();
            user.setEmail(userDto.getEmail());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            user.setName(userDto.getName());
            user.setSurName(userDto.getSurname());
            user.setCity(userDto.getCity());
            user.setCode(userDto.getCode());
            user.setAddress(userDto.getAddress());
        }

        return user;
    }

    public UserDto convertToUserDto(User user) {
        UserDto userDto = null;

        if(user != null) {
            userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setEmail(user.getEmail());
            userDto.setName(user.getName());
            userDto.setSurname(user.getSurName());
            userDto.setCity(user.getCity());
            userDto.setCode(user.getCode());
            userDto.setAddress(user.getAddress());
            userDto.setRole(user.getRole().getName());
        }

        return userDto;
    }
}
