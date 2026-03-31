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
import PublicRoute from "./components/PublicRoute";
import CurdItem from "./components/CurdItem";
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
      <PublicRoute>
        <div>
          <Navbar />
          <Login />
          <Footer />
        </div>
      </PublicRoute>
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
    path: "/curditem",
    element: (
      <PrivateRoute>
        <div>
          <AdminNavbar />
          <CurdItem />
          <AdminFooter />
        </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <div>
          <Navbar />
          <Register />
          <Footer />
        </div>
      </PublicRoute>
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
