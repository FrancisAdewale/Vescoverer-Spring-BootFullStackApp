package com.spring.fullstack.vescoverer.service;

import com.spring.fullstack.vescoverer.entity.FriendsList;
import com.spring.fullstack.vescoverer.entity.User;

import java.util.List;

public interface FriendsService {

    List<FriendsList> findAll();

    FriendsList findById(int id);

    FriendsList save(FriendsList friendsList);

    void deleteUser(int id);

}
