package com.spring.fullstack.vescoverer.service;

import com.spring.fullstack.vescoverer.dao.UserRepository;
import com.spring.fullstack.vescoverer.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(int id) {
        Optional<User> result = userRepository.findById(id);
        User user = null;

        if(result.isPresent()) {
            user = result.get();
        } else {
            throw new RuntimeException("Did not find User: " + id );
        }
        return user;
    }

    @Override
    public User save(User user) {

        return userRepository.save(user);
    }

    @Override
    public void deleteUser(int id) {

        userRepository.deleteById(id);

    }
}
