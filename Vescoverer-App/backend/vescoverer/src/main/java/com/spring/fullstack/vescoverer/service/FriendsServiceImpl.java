package com.spring.fullstack.vescoverer.service;

import com.spring.fullstack.vescoverer.dao.FriendsListRepository;
import com.spring.fullstack.vescoverer.dao.UserRepository;
import com.spring.fullstack.vescoverer.entity.FriendsList;
import com.spring.fullstack.vescoverer.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FriendsServiceImpl implements FriendsService {

    FriendsListRepository friendListRepository;

    public FriendsServiceImpl(FriendsListRepository friendListRepository) {
        this.friendListRepository = friendListRepository;
    }

    @Override
    public List<FriendsList> findAll() {
        return friendListRepository.findAll();
    }

    @Override
    public FriendsList findById(int id) {
        Optional<FriendsList> result = friendListRepository.findById(id);
        FriendsList friendsList = null;

        if(result.isPresent()) {
            friendsList = result.get();
        } else {
            throw new RuntimeException("Did not find User: " + id );
        }
        return friendsList;
    }

    @Override
    public FriendsList save(FriendsList friendsList) {

        return friendListRepository.save(friendsList);
    }

    @Override
    public void deleteUser(int id) {

        friendListRepository.deleteById(id);

    }
}
