import React from "react";
import RegsiterStyle from "./Register.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-[50%] bg-[#A5CD40] flex justify-center items-center m-auto flex-col my-20 rounded">
      <h3 className="py-3 text-4xl text-white ">Login</h3>
      <form className="flex flex-col justify-center h-[50vh] w-[100%] items-center">
        <label className={RegsiterStyle.label}>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          className="w-[70%] py-2 rounded outline-none bg-transparent border placeholder:text-white placeholder:px-2 text-white px-2"
        />
        <label className={RegsiterStyle.label}>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          className="w-[70%] py-2 rounded outline-none bg-transparent border placeholder:text-white placeholder:px-2 text-white px-2"
        />
        <div className="flex justify-around items-center w-full">
          <input
            type="submit"
            value="Login"
            className="bg-white text-[#A5CD40] w-20 h-10 rounded cursor-pointer my-3"
          />
          <Link to="/forget-password">
            <div className="bg-white text-[#A5CD40] w-36 h-10 rounded cursor-pointer my-3 flex justify-center items-center">
              Forget Password
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
