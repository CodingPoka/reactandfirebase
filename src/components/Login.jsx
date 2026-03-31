import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//import auth instance from firebase.js file to connect it with firebase authentication services
import { auth } from "../firebase";

//signInWithEmailAndPassword is a function from firebase/auth and that allows us to sign in a user with email and password. We will use this function in our handleLogin function to login a user.
import { signInWithEmailAndPassword } from "firebase/auth";

//import database instance db from firebase.js  file to connect it with firebase firestore services
import { db } from "../firebase";

//doc is used to specify the location from where we want to get the data and it have three arguments: first one is database instance (db), second one is collection name ("users") and third one is document id (user.uid). In this case, we are using the user's unique ID (uid) to specify the document from which we want to get the data.

//getDoc is used to get the data from firestore database. It takes one argument which is the location of the document from where we want to get the data.
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, //auth is for connection to firebase auth
        email, //user email
        password,
      ); //user password

      const user = userCredential.user; // get the user data which is logges in

      //get the user from firestore database

      //doc is used to spefify the locaiton from where we want to get the data. And the specific location is stored in docRef variable.
      const docRef = doc(db, "users", user.uid);

      //get the data from the specific location which is stored in docSnap variable
      const docSnap = await getDoc(docRef);

      //checking if the document exists or not. If it exists then we will get the user data from docSnap variable and store it in userData variable. We can use this userData variable to display the user data in dashboard page.
      if (docSnap.exists()) {
        const userData = docSnap.data(); //get the user data from docSnap variable and store it in userData variable

        console.log({
          name: userData.name,
          email: userData.email,
          uid: userData.uid,
          createdAt: userData.createdAt.toDate().getTime(),
        });
      } else {
        console.log("No user data found in firestore database");
      }

      alert("Login Successful ✅");

      navigate("/dashboard"); //navigate to dashboard page after successful login

      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Incoreect email or password ❌");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-600 text-sm">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
