import React, { useState, useRef, useEffect } from "react"
import { auth, provider, db } from '../../firebase.js';
import upload from "../../Images/upload.png"
import Tooltip from '@mui/material/Tooltip'
import User from "../../model/User.js";

interface IProps {
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const Upload: React.FC<IProps> = ({ callback }) => {

    const user = auth.currentUser?.email
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const [open, setOpen] = useState(false);

    const [userData, setUserData] = useState<User[] | []>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/user")
            .then(res => res.json()).catch(error => console.log(error))
            .then(data => setUserData(data))
    }, []);

    const handleTooltipClose = () => {
        setOpen(false);
    };


    const handleUploadClick = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault()
        hiddenFileInput.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setOpen(true);

                console.log(e.target?.result);

                for (let i = 0; i < userData.length; i++) {
                    if (userData[i].email === user) {
                        const requestOptions = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
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
                                age: userData[i].age,
                                imagePath: e.target?.result as string
                            }),
                        };
                        fetch("http://localhost:8080/api/user", requestOptions)
                            .then(res => res.json()).catch(err => { console.log(err) })

                    }
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    return (

        <form className="form-upload">
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Uploaded">
                <img src={upload} onClick={handleUploadClick} style={{ width: "130px", height: "130px" }} />
            </Tooltip>

            <input type="file" id="image" style={{
                display: "none"
            }} ref={hiddenFileInput}
                onChangeCapture={handleFileChange}
            />
            <button id="upload" className="upload-done-btn" onClick={(e) => callback(e)}>Next</button>
        </form>


    );
}

export default Upload;