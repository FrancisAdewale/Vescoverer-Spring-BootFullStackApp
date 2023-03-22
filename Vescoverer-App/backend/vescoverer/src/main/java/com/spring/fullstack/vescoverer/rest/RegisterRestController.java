package com.spring.fullstack.vescoverer.rest;

import com.spring.fullstack.vescoverer.entity.User;
import com.spring.fullstack.vescoverer.service.UserService;
import org.springframework.web.bind.annotation.*;



public class RegisterRestController {

    UserService userService;

    public RegisterRestController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/register")
    public User saveUser(@RequestBody User user) {
        return userService.save(user);
    }
}
