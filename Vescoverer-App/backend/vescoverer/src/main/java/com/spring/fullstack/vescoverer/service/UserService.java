package com.spring.fullstack.vescoverer.service;

import com.spring.fullstack.vescoverer.entity.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User findById(int id);

    User save(User user);

    void deleteUser(int id);

}
