package com.chetanpatil.fullStack_backend.controller;

import com.chetanpatil.fullStack_backend.exception.ValidationException;
import com.chetanpatil.fullStack_backend.service.UserService;
import com.chetanpatil.fullStack_backend.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

//    @Autowired
//    private UserRepository userRepository;
//  @PostMapping("/user")
//    User newUser(@RequestBody User newUser){
//      return userRepository.save(newUser);
//  }
//
//  @GetMapping("/users")
//    List<User> getUsers()
//  {
//      return userRepository.findAll();
//  }
//
//  @GetMapping("/user/{id}")
//      User getUserById(@PathVariable Long id){
//          return  userRepository.findById(id)
//                  .orElseThrow(()->new UserNotFoundException(id));
//  }
//
//  @PutMapping("/user/{id}")
//    User updateUser(@RequestBody User newUser, @PathVariable Long id){
//      return userRepository.findById(id)
//              .map(user -> {
//                  user.setUserName(newUser.getUserName());
//                  user.setName(newUser.getName());
//                  user.setEmail(newUser.getEmail());
//                  return userRepository.save(user);
//              }).orElseThrow(()-> new UserNotFoundException(id));
//  }
//
//  @DeleteMapping("/user/{id}")
//    String deleteUser(@PathVariable Long id)
//  {
//      if (!userRepository.existsById(id))
//      {
//          throw new UserNotFoundException(id);
//      }
//      userRepository.deleteById(id);
//      return "User with id " + id + " has been deleted successfully";
//  }


    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        // Manual validation for POST
        Map<String, String> errors = validateUser(userDto);
        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }

        UserDto createdUser = userService.createUser(userDto);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto, @PathVariable Long id) {
        // Manual validation for PUT
        Map<String, String> errors = validateUser(userDto);
        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }
        // Check if user exists before updating
        UserDto updatedUser = userService.updateUser(id, userDto);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        String response = userService.deleteUser(id);
        if (response.equals("User not found")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    // Manual validation logic
    private Map<String, String> validateUser(UserDto userDto) {
        Map<String, String> errors = new HashMap<>();

        // Manual validation checks
        if (userDto.getUserName() == null || userDto.getUserName().trim().isEmpty()) {
            errors.put("userName", "Username is mandatory");
        }
        if (userDto.getName() == null || userDto.getName().trim().isEmpty()) {
            errors.put("name", "Name is mandatory");
        }
        if (userDto.getEmail() == null || userDto.getEmail().trim().isEmpty()) {
            errors.put("email", "Email is mandatory");
        }
        return errors;
    }
}
