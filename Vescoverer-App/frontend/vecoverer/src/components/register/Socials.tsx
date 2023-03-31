import React, { useEffect, useState } from "react";
import {auth , provider} from '../../firebase.js';
import twitterLogo from "../../Images/twitter.png";
import instagramLogo from "../../Images/instagram-256.png";
import User from "../../model/User.js";

interface IProps {
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
};

const Socials : React.FC<IProps> = ({callback}) => {

    const user = auth.currentUser?.email;
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");


    const [userData, setUserData] = useState<User[] | []>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/user")
        .then(res => res.json()).catch(error => console.log(error))
        .then(data => setUserData(data))
    }, []);

    useEffect(() => {

        console.log("twitter: "  +  twitter);
        
        for(let i = 0; i < userData.length; i++) {
            if (userData[i].email === user) {
              const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
              },
                body: JSON.stringify({ 
                  id: userData[i].id,
                  email: userData[i].email, 
                  veganFor: userData[i].veganFor,
                  longitude: userData[i].longitude,
                  latitude: userData[i].latitude,
                  firstName: userData[i].firstName,
                  lastName: userData[i].lastName,
                  gender: userData[i].gender,
                  imagePath: userData[i].imagePath,
                  age: userData[i].age,
                  instagram: instagram,
                  twitter: twitter,
                  completedReg: true
                }),
            };
              fetch("http://localhost:8080/api/user", requestOptions)
              .then(res => res.json()).catch(err => {console.log(err)})
            }
          }

       },[instagram,twitter]);

    const handleInstagram = () => {
        const instagram = prompt("What is your Instagram? Without @ symbol") as string
        setInstagram(instagram);
    };

    const handleTwitter = () => {
        const twitter = prompt("What is your Twitter? Without @ symbol") as string
        setTwitter(twitter);
       
    };
    return (
        <>
        <div className="socials-container">
        <img src={instagramLogo} className="reg-instagram" onClick={handleInstagram}/>
        <img src={twitterLogo} className="reg-twitter" onClick={handleTwitter}/>
        </div>
        <button className="socials-done-btn" id="socials" onClick={(e) => callback(e)}>Done</button>
        </>
    );
}

export default Socials;