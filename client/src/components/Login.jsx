import React, { EventHandler, useState } from "react";
import  {useNavigate} from 'react-router-dom'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Topbar from "./Topbar";
 const LoginPage= () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center">
  <Topbar/>
         <div className="flex w-screen h-[95vh] justify-center items-center">
  
  <div>
  <h2 className="text-center text-7xl font-Heming">Login</h2>
  {error && <p className="error-message">{error}</p>}
  <form onSubmit={handleLogin}>
    <div className="my-5">
      <label htmlFor="email" className="text-black font-Heming font-medium leading-relaxed mb-5">Email</label>
      <Input
        className="w-[270px] text-black font-Heming font-medium leading-relaxed border-b-neutral-600 "
        placeholder="Enter your Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="my-7">
      <label htmlFor="password" className="text-black font-Heming font-medium leading-relaxed mb-5">Password</label>
      <Input
      className="text-black font-Heming font-medium leading-relaxed w-[270px] mt=3 border-b-neutral-600"
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <Button className="bg-[#8C51FE] w-[270px]">Login</Button>
    <div className="flex justify-between w-[270px mt-5 font-Heming">
      <p>Don't have an account?</p> <span onClick={()=>{
        navigate('/register')
      }} className="text-black font-semibold hover:underline transition-all duration-200">Register</span>

      </div>
  </form>
  </div>
</div>
    </div>
  );
};


export default LoginPage;