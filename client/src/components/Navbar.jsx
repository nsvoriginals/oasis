import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar= () => {
  const navigate = useNavigate();

  return (
    <div className="h-10 w-screen flex justify-between items-center font-Heming mt-6 my-3">
      {/* Logo and title */}
      <div className="flex justify-between items-center gap-7">
        <img className="ml-5 h-8 w-8" src="/logo1.png" alt="Logo" />
        <h1 className="text-center text-5xl">Oasis</h1>
      </div>
      
      {/* Navigation links */}
      <div className="flex justify-between items-center gap-7 text-2xl">
        <h4>Features</h4>
        <h4>About</h4>
        <h4>Docs</h4>
      </div>
      
      {/* Login and Register buttons */}
      <div className="flex justify-center items-center gap-7 mr-5">
        <button
          onClick={() => navigate("/login")}
          className="bg-[#8C51FE] px-5 py-3 rounded-lg text-white"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-[#8C51FE] px-5 py-3 rounded-lg text-white"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Navbar;
