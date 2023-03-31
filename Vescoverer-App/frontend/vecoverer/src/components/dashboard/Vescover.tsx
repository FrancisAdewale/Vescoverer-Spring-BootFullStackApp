import {auth , provider, db} from '../../firebase.js';
import React, {useState, useEffect} from "react"
import GoogleMapReact , {MapOptions, NESWBounds, Size, fitBounds} from 'google-map-react';
import Marker from './Marker';
import User from '../../model/User.js';


const Vescover = () => {

    const [userList, setUserList] =  useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState<User[] | []>([])

    useEffect(() => {
        fetch("http://localhost:8080/api/user")
        .then(res => res.json()).catch(error => console.log(error))
        .then(data => setUserData(data))

    }, [])

    const lng = userData
    const lat = userData

    const user = auth.currentUser?.email

    const defaultProps = {
        center: {
          lat: 48.864716,
          lng: 2.349014
        },
        zoom: 2
      };

      
      
      const handleApiLoaded = (map: any, maps: any) => {
        
      };

      const vescoverUser = (e: React.MouseEvent<HTMLDivElement>, id: string) => {

        // props.updateParent()

        var age = 0
        var firstName = ""
        var veganSince = ""
        var imagePath = ""
        

        // db.collection("users").doc(id).get()
        // .then(doc => {
        //     if (doc.exists) {

        //         console.log(doc.data().age)

        //         age = doc.data().age
        //         firstName = doc.data().firstName
        //         veganSince = doc.data().veganFor
        //         imagePath = doc.data().imagePath
        //     }
        // })
      //   .then(() => {
      //       db.collection("users").doc(user).collection("vescovered").doc(id)
      //  .set({
      //       email : id,
      //       firstName : firstName,
      //       age: age,
      //       veganSince : veganSince,
      //       image: imagePath
      //   })
      //   .catch(error => {
      //       console.log(error)
      //       })
      //   })
      //   .catch(error => {
      //       console.log(error)
      //   })
    }



    return (
        <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAoXbdfMQwOfus_BWjI9isGCIYHz6IdSnM", language: 'en',
          region: 'en',}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
            {
                 userData.map(e => {

                    return <Marker
                    key={e.email} 
                    lat={e.latitude}
                    lng={e.longitude}
                    name={e.firstName}
                    color="#3797A4"
                    id={e.email}
                    handleClick={vescoverUser}
                
                />
                })
             
            }
        </GoogleMapReact>
       
      </div>


    );
}
export default Vescover;