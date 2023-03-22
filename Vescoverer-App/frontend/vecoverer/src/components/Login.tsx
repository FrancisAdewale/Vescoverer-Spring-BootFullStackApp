import "../Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth , provider, db} from '../firebase.js';
import navLogo from '../Images/nav-logo.png';



const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState<string>("")
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [completedReg, setCompletedReg] = useState(false)

    useEffect(() => {
        getCurrentCoordinates()
        console.log(latitude + " " + longitude);
    }, [user])


    function getCurrentCoordinates(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (error) => {
              reject(error);
              
            }
          );
        });
      }

      const signin = async () => {

        auth.signInWithPopup(provider)
        .then((result) => {
          const userEmail = result.user?.email
          setUser(userEmail as string)
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
          },
            body: JSON.stringify({ 
              longitude: Math.abs(longitude),
              latitude: Math.abs(latitude),
              email : userEmail,
            }),
        };
          fetch("http://localhost:8080/api/user", requestOptions)
          .then(res => res.json()).catch(err => {console.log(err)})
          .then(data => navigate("/register"))
         }).catch(alert)
}

    return (
      <div className='login-outer'>
      <nav>
      <img src={require("../Images/nav-logo.png")} className="nav-logo" alt="logo"/>
      <h1>Vescoverer</h1>
      </nav>

      <div className='login-middle'>
          <div className='login-inner'>
          <button className="google-btn" onClick={signin}>
              Sign In with Google
          </button>
          </div>
      </div>
  </div>

    );
}

export default Login;