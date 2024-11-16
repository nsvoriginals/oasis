import React from "react";

export default function Landing(){
    return <div className="h-full w-screen  font-Heming m-5" >
     <div className="h-10 w-screen flex justify-between items-center">
      <div className="flex justify-between items-center gap-7">
        <img className="ml-5 h-8 w-8" src="./public/logo1.png" alt="" />
        <h1  className="text-center text-5xl">Oasis</h1>
      </div>
      <div className="flex justify-between items-center gap-7 text-2xl">
        <h4> Features</h4>
        <h4> About</h4>
        <h4>Docs</h4>
      </div>
      <div className="flex justify-center items-center gap-7 mr-5">
        <button className="bg-[#8C51FE] px-5 py-3 rounded-lg text-white">Login</button>
        <button className=" bg-[#8C51FE] px-5 py-3 rounded-lg text-white"> Register</button>
      </div>
     </div>
     
    </div>
}