import { useState } from 'react';
import {auth , provider, db} from '../../firebase.js';

interface IProps {
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const Name: React.FC<IProps> = ({callback}) => {

    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const user = auth.currentUser?.email
    const firstEle = document.getElementById("firstName")
    const secondEle = document.getElementById("secondName")



    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {required, value} = e.target

        console.log(value)
    
       }
    
       const handleSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
    
        const {required, value} = e.target
    
        console.log(value)

       }


    return (
        <form className="form--fullname">
            <input id="firstName" type="text" placeholder="First Name" onChange={handleFirstName}  />
            <input id="secondName" type="text" placeholder="Second Name" onChange={handleSecondName}  />
            <button className="name-done-btn" id="name" onClick={(e) => callback(e)}>Next</button>

        </form>

    );
}

export default Name;