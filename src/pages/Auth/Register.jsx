import React from "react";
import RegsiterStyle from "./Register.module.css";
import { Link } from "react-router-dom";


const Register = () => {
  return (
    <div className="w-[50%] bg-[#A5CD40] flex justify-center items-center m-auto flex-col my-20 rounded">
      <h3 className="py-3 text-4xl text-white ">Register</h3>
      <form className="flex flex-col justify-center h-[50vh] w-[100%] items-center">
        <label className={RegsiterStyle.label}>Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Your Name"
          className="w-[70%] py-2 rounded outline-none bg-transparent border placeholder:text-white placeholder:px-2 text-white px-2"
        />
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
        <div className="flex items-center gap-3">
          <input
            type="submit"
            value="Register"
            className="bg-white text-[#A5CD40] w-20 h-10 rounded cursor-pointer my-3"
          />
          <Link to="/login">
            <div className="bg-white text-[#A5CD40] w-20 h-10 rounded cursor-pointer my-3 flex items-center justify-center">
              Login
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
