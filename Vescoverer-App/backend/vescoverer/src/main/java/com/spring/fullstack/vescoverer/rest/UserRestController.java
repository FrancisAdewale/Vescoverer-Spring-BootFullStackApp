package com.spring.fullstack.vescoverer.rest;

import com.spring.fullstack.vescoverer.entity.User;
import com.spring.fullstack.vescoverer.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRestController {

    UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user")
    public List<User> getUsers() {
        return userService.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/user")
    public User saveUser(@RequestBody User user) {
        User dbUser = userService.save(user);
        return dbUser;
    }
}
