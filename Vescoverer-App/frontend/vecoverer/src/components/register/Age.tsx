// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

import React, { useEffect } from 'react'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


import { FC, SetStateAction } from 'react';
import { useState } from 'react';
import { auth } from '../../firebase';
import User from '../../model/User';




interface IProps {
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const Age: FC<IProps> = ({ callback }) => {



  const user = auth.currentUser?.email
  const [userData, setUserData] = useState<User[] | []>([])

  const [startDate, setStartDate] = useState<Date | null>(new Date(2000, 10, 10));

  const [age, setAge] = useState(0)
  const h3Ele = document.getElementById("actual-age")

  

  useEffect(() => {
    fetch("http://localhost:8080/api/user")
    .then(res => res.json()).catch(error => console.log(error))
    .then(data => setUserData(data))

}, [])

  const handleDateChange = (date: Date | null) => {
    setStartDate(date as Date)
    
  }

  useEffect(() => {
    const actualAge = calculateAge(new Date(startDate?.getFullYear() as number,
    startDate?.getMonth() as number, startDate?.getUTCDate()))

    if(h3Ele != null) {
      h3Ele.innerHTML = actualAge.toString();

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
              age: actualAge,
              firstName: userData[i].firstName,
              lastName: userData[i].lastName
            }),
        };
    
          fetch("http://localhost:8080/api/user", requestOptions)
          .then(res => res.json()).catch(err => {console.log(err)})

        }
      }

    }
      

  }, [startDate]);

  console.log("start date: " + startDate);



  function calculateAge(date: Date) {
    var dob = date
    //calculate month difference from current date in time  
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);

    // const diff = Math.abs(now.getDate() - date.getDate());
    // const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
    return age
  }

  return (
    <div className="date-picker">
      <DatePicker selected={startDate} onChange={handleDateChange} />
      <h3 id="actual-age" style={{
        marginTop: "20px"
      }}></h3>
      <button className="age-done-btn" id="age" onClick={(e) => callback(e)}>Next</button>
    </div>
  );
}

export default Age;