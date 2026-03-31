import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  //we will use useEffect to get the user data from localStorage when the component mounts. And we will store the user data in the user state variable.

  useEffect(() => {
    //store the localStorage data in userData variable
    const userData = localStorage.getItem("user");

    //we will use JSON.parse to convert the userData in to boject because localStorage stores data in string format.

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-3xl font-bold">
      <div className="flex flex-col h-fit w-fit px-10 py-10 justify-end items-center bg-blue-500 text-white">
        {/* check if user exists or not. If user exists then we will display the user data in the profile page. */}
        {user ? (
          <div className="flex flex-col justify-center items-center gap-5">
            <h1>Profile Page</h1>
            <h1>Name : {user.name}</h1>
            <h1>Email : {user.email}</h1>
          </div>
        ) : (
          <h1>Loading.......</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
