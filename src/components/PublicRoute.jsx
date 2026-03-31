import React from 'react'
import { Navigate } from 'react-router-dom';


//here we will create a public route component that will check if the user is logged in or not. If the user is logged in then it will navigate to the dashboard page otherwise it will render the children components which is Login and Register page. Here children components comes from the App.jsx file what we wrapped inside the Public Route component. And Here children components will be Login and Register page
const PublicRoute = ({children
}) => {
    
    //get the user data from localstorage and store it in user variable. We will use this user variable to check if the user is logged in or not.
    const user = localStorage.getItem("user");

    //if user is logged in then Navigate to dashboard page
    if(user){
        return <Navigate to="/dashboard" />
    }
    //if user is not logged in then render the children components which is Login and Register page
    return children;
}

export default PublicRoute