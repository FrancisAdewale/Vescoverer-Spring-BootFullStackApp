package com.spring.fullstack.vescoverer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="friends_list")
public class FriendsList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="friend_id")
    int id;

    @JsonIgnore
    @ManyToOne(cascade= { CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="user_id")
    User user;

    @Column(name="friend_user_id")
    int friendId;

    public FriendsList() {}

    public FriendsList(User user, int friendId) {
        this.user = user;
        this.friendId = friendId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getFriendId() {
        return friendId;
    }

    public void setFriendId(int friendId) {
        this.friendId = friendId;
    }



    @Override
    public String toString() {
        return "FriendsList{" +
                "id=" + id +
                ", user=" + user +
                ", friendId=" + friendId +
                '}';
    }
}
