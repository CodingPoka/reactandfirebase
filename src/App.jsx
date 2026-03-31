import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import AdminNavbar from "./components/AdminNavbar";
import AdminFooter from "./components/AdminFooter";
import Contact from "./components/Contact";
import Product from "./components/Product";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div>
        <Navbar />
        <About />
        <Footer />
      </div>
    ),
  },
  {
    path: "/contact",
    element: (
      <div>
        <Navbar />
        <Contact />
        <Footer />
      </div>
    ),
  },
  {
    path: "/product",
    element: (
      <div>
        <Navbar />
        <Product />
        <Footer />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Navbar />
        <Login />
        <Footer />
      </div>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <div>
          <AdminNavbar />
          <Profile />
          <AdminFooter />
        </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <div>
          <AdminNavbar />
          <Dashboard />
          <AdminFooter />
        </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Navbar />
        <Register />
        <Footer />
      </div>
    ),
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
