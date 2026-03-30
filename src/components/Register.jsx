import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase";

// createUserWithEmailAndPassword is a function from firebase/auth and that allows us to create a new user with email and password. We will use this function in our handleRegister function to register a new user.
import { createUserWithEmailAndPassword } from "firebase/auth";

//we will import db from firebase and we will use it to store the user data in firestore database.
import { db } from "../firebase";

//setDoc is used to save the data
//doc is used to speify the location where we want to save
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    //checking all fields are filled or not

    if (!name || !email || !password) {
      alert("Please fill all the fields ❌");
      return;
    }

    try {
      //create a new user with email and password using createUserWithEmailAndPassword function from firrebaase/auth

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      //get the user from userCredential
      const user = userCredential.user;

      //setDoc used to save the data in firestore. And it takes two argument. the first one  is doc and  is used to spefiy the location where we want to save the data and the second one is data what we want to save.

      //doc is used to speify the location where we want to save the data in the firestore database. It takes three arguments: first database instance (db), second collection name("users") and thrid one document Id (user.uid). In this case, we are using the user's unique ID (uid) as the document ID to ensure that each user's data is stored in a separate document.
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        uid: user.uid,
        createdAt: new Date(),
      });

      alert("Registration Successful ✅");
      navigate("/login");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
