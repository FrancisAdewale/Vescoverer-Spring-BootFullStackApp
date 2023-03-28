import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import AccInstaIcon from "../../Images/account-instagram.png";
import AccTwitterIcon from "../../Images/account-twitter.png";
import Tooltip from '@mui/material/Tooltip';
import {auth} from '../../firebase.js';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Navigate, useNavigate } from "react-router-dom";
import { borderRadius, fontFamily } from "@mui/system";
import EditPopUp from "./EditPopUp";
import PlaceholderImage from "../../Images/placeholder1.png";






interface IProps {
    updateParent: (e: React.MouseEvent<HTMLButtonElement>,
         firstName: string,
         secondName: string,
         twitter: string,
         instagram: string,
         image: string
         ) => void
    id: number | undefined
    firstName: string | undefined
    lastName: string | undefined
    email: string | undefined
    age: number | undefined
    veganFor: string | undefined
    gender: string | undefined
    twitter: string | undefined
    instagram: string | undefined
    imagePath: string | undefined
    address: string | undefined
  }
  


const Account: React.FC<IProps> = ({ id, firstName,
    lastName, email, age, veganFor,
    gender,twitter, instagram, 
    imagePath, updateParent, address
}) => {


    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [editFirstname, setEditFirstName] = useState('')
    const [editSecondName, setEditSecondName] = useState('')
    const [editInstagram, setEditInstagram] = useState('')
    const [editTwitter, setEditTwitter] = useState('')
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    const [newImage, setNewImage] = useState('')

    const user = auth.currentUser?.email

    const togglePopup = () => {
        setIsOpen(!isOpen);
      }
    
    const handleEdit = () => {
            setIsOpen(!isOpen)
        }
    
    const handleUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    
        event.preventDefault()
        hiddenFileInput.current?.click();
            
    };
    
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
            const {id, value} = event.target

                   

            switch(id) {
                 //@ts-ignore 
                case "firstName":
                    setEditFirstName(value)
                //@ts-ignore    
                case "secondName":
                    setEditSecondName(value)
                //@ts-ignore 
                case "instagram":
                    setEditInstagram(value)
                default:
                    setEditTwitter(value)
            }
    
        }
    
        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
            if (event.target.files && event.target.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
    
                    setNewImage(e.target?.result as string)
                };
                reader.readAsDataURL(event.target.files[0]);
              }
        }  
    
        const logout = () => {
    
            auth.signOut()
            .then(() => {
                navigate("/login")
    
            })
            .catch(error => {
                console.log(error)
            })
        }
    
        const deleteAcc = () => {
            // db.collection("users").doc(user).delete().then(() => {
                
            //     console.log("Document successfully deleted!");
            //     navigate("/login")
            // }).catch((error) => {
            //     console.error("Error removing document: ", error);
            // });
        }
    


    return (
        <div className="account-scroll-container">
            <table>
                <thead>
                    <tr>
                        <th scope="row" colSpan={2}>
                            <Tooltip title="Edit Account">
                                <ModeEditOutlineOutlinedIcon onClick={handleEdit} />
                            </Tooltip>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" colSpan={2}>

                            <img className="account--avatar" src={imagePath} 
                            placeholder={PlaceholderImage}
                            style={{
                                margin: "35px 0px"
                            }}
                            />

                            <h3 id="acc-full-name">{(firstName !== undefined &&
                                lastName !== undefined) ? `${firstName} ${lastName}` : ""}</h3>  </th>
                    </tr>
                    <tr>
                        <th scope="row" colSpan={2}><h3>{age !== undefined ? `${age} Years Old` : ""}</h3></th>
                    </tr>
                    <tr>
                        <th scope="row" colSpan={2}> <h3>{`Vegan For: ${veganFor !== undefined ? veganFor : ""}`}</h3> </th>
                    </tr>
                    <tr>
                        <th scope="row" colSpan={2}></th>
                    </tr>
                    <tr>
                        <th scope="row" colSpan={2}> <h3>{gender}</h3> </th>
                    </tr>
                    <tr>
                        <th scope="row" colSpan={2}>
                            <Tooltip title={`@${instagram}`}>
                                <img src={AccInstaIcon} style={{
                                    display: "inline-block",
                                    margin: " 0 40px"

                                }} />

                            </Tooltip>

                            <Tooltip title={`@${twitter}`}>
                                <img src={AccTwitterIcon} style={{
                                    display: "inline-block",
                                    margin: " 0 40px"

                                }} />
                            </Tooltip>

                        </th>
                    </tr>
                    <tr>
                        <th scope="row"colSpan={2}><h3>{address}</h3></th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" colSpan={2}><button style={{ backgroundColor: "#3797A4", color: "white" }} onClick={logout}>Sign Out</button>
                            <button style={{ backgroundColor: "red", marginLeft: "16px", color: "white" }} onClick={deleteAcc}>Delete Account</button></th>
                    </tr>
                </tfoot>
                {isOpen && <EditPopUp
                    content={<>
                        <form className="form--popup">
                            <legend><h3 style={{
                                fontWeight: "200",
                                fontFamily: "sans-serif",

                            }}>Edit Account</h3></legend>
                            <label id="first"> First name: </label>
                            <input type="text" id="firstName" name="first" placeholder={firstName} onChange={handleChange} />
                            <label id="second"> Second name:</label>
                            <input type="text" id="secondName" placeholder={lastName} onChange={handleChange} />
                            <label id="instagram"> Instagram</label>
                            <input type="text" id="instagram" placeholder={instagram} onChange={handleChange} />
                            <label id="twitter"> Twitter</label>
                            <input type="text" id="twitter" placeholder={twitter} onChange={handleChange} />
                            <button className="home-done-btn" onClick={handleUploadClick} style={
                                {
                                    backgroundColor: "#3797A4",
                                    height: "70px",
                                    color: "black"
                                }
                            }>New Avatar</button>
                            <input type="file" id="image" style={{
                                display: "none"
                            }} ref={hiddenFileInput}
                                onChangeCapture={handleFileChange}
                            />

                        </form>

                        <hr style={{
                            color: "#272829",
                            width: "100%",
                            border: "solid",

                        }} />
                        <button style={{
                            float: "right",
                            width: "100px",
                            height: "50px",
                            backgroundColor: "#3797A4",
                            borderRadius: "20px",
                            border: "none",
                            fontFamily: "sans-serif",
                            fontSize: "20px"

                        }}
                            onClick={(e) => updateParent(e, editFirstname, editSecondName, editTwitter, editInstagram, newImage)}>Done</button>


                    </>}
                    handleClose={togglePopup}
                />}


            </table>
        </div>

    );

}

export default Account;