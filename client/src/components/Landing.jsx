import React from "react";
import Navbar from "./Navbar";
function Landing() {
  return (
    <div className="h-screen w-screen font-Heming m-0 p-0 bg-cover bg-no-repeat">
    <Navbar/>
      <div id="hero" className="w-screen flex flex-col justify-center items-center mt-28">
        <h1 className="text-[105px] text-center w-[90vw] leading-tight">
          Virtual spaces <br />
          <span className="text-[#8C51FE] text-[125px]">Re-imagined for</span> <br />
          collaborations
        </h1>
        <h4>Connect. Create . Collaborate</h4>
        <h3>Anywhere</h3>
      </div>
    </div>
  );
}
//bg-[url('./public/test.png')]
export default Landing;