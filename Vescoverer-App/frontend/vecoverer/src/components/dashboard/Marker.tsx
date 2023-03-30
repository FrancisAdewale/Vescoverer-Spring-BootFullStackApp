import { Color } from "@mui/material";
import React from "react"
import './Marker.css';


interface IProps {
    color: string
    name: string
    id: string
    handleClick: (e: React.MouseEvent<HTMLDivElement>, id: string) => void,
    lat: number
    lng: number
}

const Marker: React.FC<IProps> = ({color, name, id, handleClick, lat, lng}) => {


    const hover = (e: React.MouseEvent) => {

        const target  = e.target as HTMLDivElement
        target.style.backgroundColor = "#272829"
    }

    const unHover = (e: React.MouseEvent) => {

    const target  = e.target as HTMLDivElement
      target.style.backgroundColor = "#3797A4"
    }

    return (

        <div className={"marker"}
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={`Add ${name}`}
        onClick={(e) => handleClick(e, id)}
        onMouseOver={hover}
        onMouseLeave={unHover}
      />
    );
}

export default Marker;