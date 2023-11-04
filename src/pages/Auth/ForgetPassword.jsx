import React from "react";
import RegsiterStyle from "./Register.module.css";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <div className="w-[50%] bg-[#A5CD40] flex justify-center items-center m-auto flex-col my-20 rounded">
      <h3 className="py-3 text-4xl text-white ">Forget Password</h3>
      <form className="flex flex-col justify-center h-[50vh] w-[100%] items-center">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          className="w-[70%] py-2 rounded outline-none bg-transparent border placeholder:text-white placeholder:px-2 text-white px-2"
        />
        <div className="flex justify-around items-center w-full">
          <input
            type="submit"
            value="Submit"
            className="bg-white text-[#A5CD40] w-20 h-10 rounded cursor-pointer my-3"
          />
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
