package com.spring.fullstack.vescoverer.dao;

import com.spring.fullstack.vescoverer.entity.FriendsList;
import com.spring.fullstack.vescoverer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendsListRepository extends JpaRepository<FriendsList, Integer> {


}
