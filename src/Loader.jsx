import React from "react";
import logo from "./assets/logo.svg";
import "./spinner.css";

const Loader = () => {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center bg-gradient-to-br from-slate-800 to-slate-950 text-white">
      <img src={logo} alt="Spotify" className="w-40" />
      <div className="spinner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
