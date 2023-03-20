package com.spring.fullstack.vescoverer.entity;

import jakarta.persistence.*;

@Entity
@Table(name="friends_list")
public class FriendsList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    int id;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="user_id")
    User user;


}
