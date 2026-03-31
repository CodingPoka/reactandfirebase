import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  //using useEffect to get the user data from localStorage when the component mounts
  useEffect(() => {
    //get the use data from localStorage and store it in userData variable
    const userData = localStorage.getItem("user");

    if (userData) {
      //convert the localstorage data from string to object using JSON.parse and store it in user state variable using setUser function
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl py-10 text-red-400">
        Welcome To Dashboard
      </h1>

      <div>
        {user ? (
          <div>
            <h1 className="text-center text-2xl font-bold">
              Name : {user.name}
            </h1>
            <h1 className="text-center text-2xl font-bold">
              Email : {user.email}
            </h1>
          </div>
        ) : (
          <div>
            {" "}
            <h1 className="text-center text-2xl font-bold">User not found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
