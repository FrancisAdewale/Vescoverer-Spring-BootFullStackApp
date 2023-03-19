import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [completedReg, setCompletedReg] = useState(false)

    useEffect(() => {
        getCurrentCoordinates()
        console.log(latitude + " " + longitude);
    }, [])

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

    return (
        <div>
            meh
        </div>

    );
}

export default Login;