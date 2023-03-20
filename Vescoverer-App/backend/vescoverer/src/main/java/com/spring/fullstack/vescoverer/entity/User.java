package com.spring.fullstack.vescoverer.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    int id;

    @Column(name="first_name")
    String firstName;

    @Column(name="last_name")
    String lastName;

    @Column(name="email")
    String email;

    @Column(name="age")
    int age;

    @Column(name="vegan_for")
    String veganFor;

    @Column(name="longitude")
    double longitude;

    @Column(name="latitude")
    double latitude;

    @Column(name="gender")
    String gender;

    @Column(name="twitter")
    String twiiter;

    @Column(name="instagram")
    String instagram;

    @Column(name="image")
    String ImagePath;

    @OneToMany(mappedBy="user",
            cascade= {CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH})
    private List<FriendsList> friendsList;



    public User() {

    }

    public User(String firstName, String lastName,
                String email, int age, String veganFor,
                double longitude, double latitude,
                String gender, String twiiter,
                String instagram, String imagePath) {

                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email;
                    this.age = age;
                    this.veganFor = veganFor;
                    this.longitude = longitude;
                    this.latitude = latitude;
                    this.gender = gender;
                    this.twiiter = twiiter;
                    this.instagram = instagram;
                    ImagePath = imagePath;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getVeganFor() {
        return veganFor;
    }

    public void setVeganFor(String veganFor) {
        this.veganFor = veganFor;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getTwiiter() {
        return twiiter;
    }

    public void setTwiiter(String twiiter) {
        this.twiiter = twiiter;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getImagePath() {
        return ImagePath;
    }

    public void setImagePath(String imagePath) {
        ImagePath = imagePath;
    }

    public List<FriendsList> getFriendsList() {
        return friendsList;
    }

    public void setFriendsList(List<FriendsList> friendsList) {
        this.friendsList = friendsList;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", veganFor='" + veganFor + '\'' +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", gender='" + gender + '\'' +
                ", twiiter='" + twiiter + '\'' +
                ", instagram='" + instagram + '\'' +
                ", ImagePath='" + ImagePath + '\'' +
                '}';
    }
}
