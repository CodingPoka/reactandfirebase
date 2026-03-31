import React from "react";
import { Link, useNavigate } from "react-router-dom";

//importing firebase auth instance
import { auth } from "../firebase";

//import logout function from firebase
import { signOut } from "firebase/auth";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      //for logout use signOut method
      await signOut(auth);

      alert("Logout Successful ✅");
      localStorage.removeItem("user"); //remove the user data from localStorage when user logs out

      navigate("/login");
    } catch (error) {
      console.log(error.message);
      alert("Error Logging out ❌");
    }
  };
  return (
    <div className="flex bg-sky-600 h-16 justify-around items-center text-2xl text-white">
      <div>
        <h1>Admin Navbar</h1>
      </div>
      <div className="flex gap-20">
        <Link to="/profile">Profile</Link>
        <Link to="/dashboard">Dashbaord</Link>
      </div>
      <div>
        <button
          className="bg-red-500 px-3 py-1 rounded-md font-bold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
