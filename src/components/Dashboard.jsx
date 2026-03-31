import React, { useEffect, useState } from 'react'

const Dashboard = () => {

  const [user,setUser]= useState(null);


  //using useEffect to get the user data from localStorage when the component mounts
  useEffect(()=>{
    
    //get the use data from localStorage and store it in userData variable
     const userData = localStorage.getItem("user");

  })

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard