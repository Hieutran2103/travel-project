import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ErrorVacation() {
    const location = useLocation()
    // console.log(location)
  return (
    <>
     <div style={{display: "flex", justifyContent:"center", alignItems: "center", height: "100vh", fontSize: 30, backgroundColor: "#f6f3f3"}}>{location.state}</div>
    </>
   
  )
}
