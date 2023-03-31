package com.spring.fullstack.vescoverer.rest;

import com.spring.fullstack.vescoverer.entity.FriendsList;
import com.spring.fullstack.vescoverer.entity.User;
import com.spring.fullstack.vescoverer.service.FriendsService;
import com.spring.fullstack.vescoverer.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FriendsRestController {

    FriendsService friendsService;

    public FriendsRestController(FriendsService friendsService) {
        this.friendsService = friendsService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/friends")
    public List<FriendsList> getFriends() {
        return friendsService.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/friends")
    public FriendsList saveFriends(@RequestBody FriendsList friendsList) {
        FriendsList dbFriends = friendsService.save(friendsList);
        return dbFriends;
    }
}
