import React from "react";

import { Outlet } from "react-router-dom";

//COMPONENTES
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//TOASTIFY
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";


function App() {
  return (
    <>
      <Navbar />
      <div className="container container-principal">
        <ToastContainer />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
