import React from "react";
import logo from "../../components/images/logo.png";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <>
      {/* first */}
      <div className="flex justify-center items-center py-1 pb-3">
        <p className="font-bold text-lg text-[#a5cd40]">🚨FREE CREATINE WHEN YOU SPEND $120 ON MAX'S SUPPLEMENTS🚨</p>
      </div>
      {/* second */}
      <div className="flex justify-between items-center px-5">
        <div>
          <img src={logo} alt="logo" className="h-20 w-48 mx-10" />
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="w-full border py-3 placeholder:px-3 px-3"
            placeholder="Search over 10,000 products..."
          />
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center px-3 gap-3 cursor-pointer hover:text-[#a5cd40]">
            <CiLocationOn style={{ fontSize: "1.7rem" }} className="text-[#a5cd40]"/>
            <p className="font-bold">FIND A STORE</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer hover:text-[#a5cd40]">
            <AiOutlineUser style={{ fontSize: "1.7rem" }} className="text-[#a5cd40]"/>
            <p className="font-bold">MY ACCOUNT</p>
          </div>
          {/* third part here */}
          <div className="flex">
            <div className="w-12 h-10 bg-[#EFEFEF] flex">
              <AiOutlineShoppingCart
                className="m-auto text-[#a5cd40]"
                style={{ fontSize: "2rem" }}
              />
            </div>
            <div className="w-12 h-10 text-center bg-[#a5cd40] text-white flex justify-center items-center">
              0
            </div>
          </div>
        </div>
      </div>
      {/* third */}
      <div className="bg-[#a5cd40] text-white w-full h-10 mt-3 leading-10">
        <ul className="flex justify-around items-center font-bold">
          <li className="cursor-pointer">CATEGORIES</li>
          <li className="cursor-pointer">BRANDS</li>
          <li className="cursor-pointer">SPECIALS</li>
          <li className="cursor-pointer">NEW</li>
          <li className="cursor-pointer">SUPP AWARDS</li>
          <li className="cursor-pointer">FIT TALK</li>
          <li className="cursor-pointer">PICKUP & DELIVERY</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
