import { useEffect, useState } from 'react';
import {auth , provider, db} from '../../firebase.js';
import User from '../../model/User.js';

interface IProps {
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Name: React.FC<IProps> = ({callback}) => {

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const user = auth.currentUser?.email;
  
    const [userData, setUserData] = useState<User[] | []>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/user")
        .then(res => res.json()).catch(error => console.log(error))
        .then(data => setUserData(data))
    }, []);

  

    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {required, value} = e.target;
        setFirstName(value);
        
       }
    
       const handleSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {required, value} = e.target;
        setSecondName(value);
       }

       useEffect(() => {
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
                  firstName: firstName,
                  lastName: secondName
                }),
            };
              fetch("http://localhost:8080/api/user", requestOptions)
              .then(res => res.json()).catch(err => {console.log(err)})
            }
          }

       },[firstName,secondName]);

    return (
        <form className="form--fullname">
            <input id="firstName" type="text" placeholder="First Name" onChange={handleFirstName}  />
            <input id="secondName" type="text" placeholder="Second Name" onChange={handleSecondName}  />
            <button className="name-done-btn" id="name" onClick={(e) => callback(e)}>Next</button>
        </form>

    );
}

export default Name;