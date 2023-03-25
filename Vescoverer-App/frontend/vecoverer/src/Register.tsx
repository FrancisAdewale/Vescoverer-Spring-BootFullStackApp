import { auth, provider, db } from './firebase.js';
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./Register.css";
import Name from './components/register/Name';
import VeganFor from './components/register/VeganFor';
import Age from './components/register/Age';
import Gender from './components/register/Gender';
import Upload from './components/register/Upload';


const Register = () => {

    const navigate = useNavigate();
    const names = ["Vegan For", "Name", "Age", "Gender", "Upload Image", "Socials"];

    const user = auth.currentUser?.email
    const [dbUser, setDbUser] = useState(null);
    const [veganForShake, setVeganForShake] = useState(false);
    const [sections, setSections] = useState(
        [
            {name : "Vegan For", veganForCompleted : false},
            {name : "Name", nameCompleted: false},
            {name : "Age", ageCompleted : false},
            {name : "Gender", genderCompleted : false},
            {name : "Upload Image", uploadCompleted : false},
            {name : "Socials", socialsCompleted : false}
    ]
    )
    const [sectionCount, setSectionCount] = useState(0);
    

    const changeRegState = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();
        const { id } = e.target as Element;

        console.log(id);
        
        if(id === "vegan") {

                setSectionCount(sectionCount => sectionCount + 1)

                let temp_state = [...sections]

                let temp_element = { ...temp_state[0] }
        
                temp_element.veganForCompleted = !temp_state[0].veganForCompleted

                temp_state[0] = temp_element

                setSections(temp_state)
                 
        } 
        
        if(id === "name") {

            setSectionCount(sectionCount => sectionCount + 1)
            let temp_state = [...sections]

            let temp_element = { ...temp_state[1] }
    
            temp_element.nameCompleted = !temp_state[1].nameCompleted

            temp_state[1] = temp_element
            setSections(temp_state)
        }

        if(id === "age") {

            setSectionCount(sectionCount => sectionCount + 1)
            let temp_state = [...sections]

            let temp_element = { ...temp_state[2] }
    
            temp_element.ageCompleted = !temp_state[2].ageCompleted

            temp_state[2] = temp_element
            setSections(temp_state)
        }

        if(id === "gender") {

            setSectionCount(sectionCount => sectionCount + 1)
            let temp_state = [...sections]

            let temp_element = { ...temp_state[3] }
    
            temp_element.genderCompleted = !temp_state[3].genderCompleted

            temp_state[3] = temp_element
            setSections(temp_state)
        }

        if(id === "upload") {

            setSectionCount(sectionCount => sectionCount + 1)
            let temp_state = [...sections]

            let temp_element = { ...temp_state[4] }
    
            temp_element.uploadCompleted = !temp_state[4].uploadCompleted

            temp_state[4] = temp_element
            setSections(temp_state)
        }

        if(id === "socials") {

            let temp_state = [...sections]

            let temp_element = { ...temp_state[5] }
    
            temp_element.socialsCompleted = !temp_state[5].socialsCompleted

            temp_state[5] = temp_element
            setSections(temp_state)

            // db.collection("users").doc(user).set({
            //     completedRegistration : true,
            //     isVerified: false,
            //     uploadedVerifyImage: false
            // }, { merge: true })
            navigate("/dashboard")
        }

    }
    
    return (
        <div className='register-outer'>
            <nav className="nav--register-title">{names[sectionCount]}</nav>

            <div className='register-middle'>
                <div className='register-inner'>
                    {
                        (function () {

                            switch (true) {
                                case (sections[0].veganForCompleted && sections[1].nameCompleted === false):

                                    return <Name
                                        callback={changeRegState}
                                    />

                                case (sections[2].ageCompleted === false && sections[1].nameCompleted):
                                    return <Age
                                        callback={changeRegState}
                                    />

                                case (sections[1].nameCompleted && sections[2].ageCompleted && sections[0].veganForCompleted && sections[3].genderCompleted === false):
                                    return <Gender
                                        callback={changeRegState}
                                    />

                                case (sections[4].uploadCompleted === false && sections[3].genderCompleted):
                                    return <Upload
                                        callback={changeRegState}
                                    />

                                // case (sections[5].socialsCompleted === false && sections[4].uploadCompleted):
                                //     return <Socials
                                //         callback={changeRegState}
                                //     />

                                default:
                                    return <VeganFor
                                        callback={changeRegState}
                                    />
                            }

                        })()
                    }
                </div>
            </div>
        </div>

    );
}

export default Register;