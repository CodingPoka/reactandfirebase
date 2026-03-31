import React from "react";
import { useNavigate } from "react-router-dom";

//here we will create a private route component that will check if the user is logged in or not. If the user is logged in  then it will render the children components otherwise it will navigate to the login page. Here children components comes from the App.jsx file what we wrapped inside the Private Route component. And Here children components will be Profile and Dashboard page
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  //get the user data from localstorage and store it in user variable. We will use this user variable to check if the user is logged in or not.
  const user = localStorage.getItem("user");

  //if user not logged in then navigate to login page
  if (!user) {
    return navigate("/login");
  }

  //if user is logged in then render the children components which is Profile and Dashboard page
  return children;
};

export default PrivateRoute;
