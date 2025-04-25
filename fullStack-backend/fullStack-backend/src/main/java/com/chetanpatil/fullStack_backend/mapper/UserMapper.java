package com.chetanpatil.fullStack_backend.mapper;

import com.chetanpatil.fullStack_backend.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    void insertUser(UserDto user);
    UserDto getUserById(Long id);
    List<UserDto> getAllUsers();
    void updateUser(UserDto user);
    void deleteUser(Long id);
    int countByUserName(String userName);

}
