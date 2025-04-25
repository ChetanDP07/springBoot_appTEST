package com.chetanpatil.fullStack_backend.service;

import com.chetanpatil.fullStack_backend.dto.UserDto;
import com.chetanpatil.fullStack_backend.exception.ValidationException;
import com.chetanpatil.fullStack_backend.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

//    @Autowired
    private final UserMapper userMapper;

    public UserDto createUser(UserDto userDto){
        if (userMapper.countByUserName(userDto.getUserName()) > 0) {
            throw new ValidationException(Map.of("userName", "Username already exists"));
        }
        userMapper.insertUser(userDto);
        return userDto;
    }

    public List<UserDto> getAllUsers() {
        return userMapper.getAllUsers();
    }

    public UserDto getUserById(Long id) {
        UserDto user = userMapper.getUserById(id);
        if (user == null) throw new RuntimeException("User not found with id " + id);
        return user;
    }

    public UserDto updateUser(Long id, UserDto updated) {
        UserDto existingUser = userMapper.getUserById(id);
        if (existingUser == null) throw new RuntimeException("User not found with id " + id);

        if (!existingUser.getUserName().equals(updated.getUserName())
                && userMapper.countByUserName(updated.getUserName()) > 0) {
            throw new ValidationException(Map.of("userName", "Username already exists"));
        }
        userMapper.updateUser(updated);
        return updated;
    }

    public String deleteUser(Long id) {

        userMapper.deleteUser(id);
        return "User with id " + id + " has been deleted successfully";
    }
}
