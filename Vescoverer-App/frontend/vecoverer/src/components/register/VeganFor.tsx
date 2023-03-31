import { useEffect, useState } from "react"
import { auth, db } from "../../firebase"
import User from "../../model/User"
import { Navigate, useNavigate } from "react-router-dom";



interface IProps {
    callback : (e:React.MouseEvent<HTMLButtonElement> ) => void
}


const VeganFor : React.FC<IProps> = ({callback}) => {
    
    const navigate = useNavigate()
    const [val, setVal] = useState("<5 Years")
    const [required, setRequired] = useState(false)
    const user = auth.currentUser?.email
    const [userData, setUserData] = useState<User[] | []>([])

    useEffect(() => {
        fetch("http://localhost:8080/api/user")
        .then(res => res.json()).catch(error => console.log(error))
        .then(data => setUserData(data))

    }, [])

    console.log("veganfor : " + userData)



    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const h3Eele = document.getElementById("timeframe") as Element
        const {value, required} = e.target
        setVal(value)
        setRequired(required)

        h3Eele.textContent = value
        

        //potentially pass this as a function to parent component
        for(let i = 0; i < userData.length; i++) {
          if (userData[i].email === user) {
            const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json',
            },
              body: JSON.stringify({ 
                id: userData[i].id,
                email: userData[i].email, 
                veganFor: val,
                longitude: userData[i].longitude,
                latitude: userData[i].latitude
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
          <label id="select-box1" className={"label select-box1" }><span className="label-desc" id="select">Choose Your Timeframe</span> </label>
          <select id="select-box1" className="select" onChange={handleChange} required={true} value={val} >
            <option value="<20 Years" > Less than 20 Years</option>
            <option value="<10 Years"> Less than 10 Years</option>
            <option value="<5 Years"> Less than 5 Years</option>
            <option value="<2 Years"> Less than 2 Years</option>
            <option value="<6 Months">Less than 6 Months</option>
          </select>
          <h3 id="timeframe" style={{
            marginTop : "20px"

          }}></h3>
          <button id="vegan" className="vegan-done-btn" onClick={(e) => callback(e)}>Next</button>
        </div>
      </form>  

    );
}

export default VeganFor