import { hasUncaughtExceptionCaptureCallback } from "process";
import React, { ChangeEvent, FC, useEffect, useState } from "react"
import {auth , provider, db} from '../../firebase';
import User from "../../model/User";


interface IProps {
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  }
  

const Gender : FC<IProps> = ({callback}) => {

    const user = auth.currentUser?.email

    const [userData, setUserData] = useState<User[] | []>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/user")
        .then(res => res.json()).catch(error => console.log(error))
        .then(data => setUserData(data))
    }, []);



    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const h3Eele = document.getElementById("user-gender") as HTMLHeadingElement
        const {value} = e.target
        h3Eele.textContent = value
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
                  age: userData[i].age,
                  gender: value
                }),
            };
        
              fetch("http://localhost:8080/api/user", requestOptions)
              .then(res => res.json()).catch(err => {console.log(err)})
  
            }
          }
  
    }

    return (
        <form>
        <div className="select-box">
          <label id="select-box1" className="label select-box1"><span className="label-desc">Choose Your Gender</span> </label>
          <select id="select-box1" className="select" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female" selected={true}>Female</option>
          </select>
          <h3 id="user-gender" style={{
            marginTop: "20px"
          }}></h3>
          <button id="gender" className="gender-done-btn" onClick={(e) => callback(e)}>Next</button>
        </div>
      </form>  

    );
}

export default Gender;