//Import the core Firebase function to initialize app
import { initializeApp } from "firebase/app";

// Import authentication service from Firebase
import { getAuth } from "firebase/auth";


//getFirestore is function used to work with firestore database
import {getFirestore} from "firebase/firestore";

/*
  🔐 Firebase Configuration Object
  These values come from your Firebase project settings
  We are using environment variables (.env) for safety and flexibility
*/
const firebaseConfig = {
  // 🔑 API key used to identify your app when making requests to Firebase
  // Required for authentication, database, etc.
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  // 🌐 Domain used for authentication (login, signup, OAuth like Google)
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  // 📦 Unique ID of your Firebase project
  // Used to connect to Firestore, storage, etc.
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

  // 🗂 Storage bucket for file uploads (images, files)
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  // 📩 Used for Firebase Cloud Messaging (push notifications)
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

  // 🆔 Unique identifier for your app
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


/*
   Initialize Firebase App
  This connects your React app to Firebase backend
*/
const app = initializeApp(firebaseConfig);

/*
  🔐 Initialize Authentication Service
  This enables features like:
  - Sign up
  - Login
  - Logout
  - Auth state tracking
*/
export const auth = getAuth(app);

/*
  ✅ Now you can import `auth` anywhere in your app like:
  import { auth } from "../firebase";
*/

export const db=getFirestore(app);
//export firestore database instance db to use in other parts of the app for CRUD operations (Create, Read, Update, Delete)