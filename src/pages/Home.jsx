import React from "react";
import Banner from "./Banner";
import MaskImg from "../components/images/Mask-Group-5-1.png";
import appImg from "../components/images/applewatch.png";
import laptopImg from "../components/images/Laptop.png";
import MenImg from "../components/images/men.png";
import GameImg from "../components/images/game.png";
import headphoneImg from "../components/images/headphone.png";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BiHeadphone } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="mx-5">
        {/* first part here */}
        <div className="flex gap-3 py-10">
          <div className="w-2/4 h-96 bg-[#000] rounded-3xl">
            <div className="flex justify-around items-center">
              <div className="text-white w-1/2 text-left pl-20">
                <p className="text-xl py-1">Enjoy</p>
                <p className="text-4xl py-1 font-bold">With</p>
                <h3 className="py-1 text-6xl text-[#444444] font-bold">
                  EARPHONE
                </h3>
                <div className="bg-red-600 w-36 h-12 rounded-3xl flex items-center justify-center my-3 cursor-pointer text-xl">
                  Browse
                </div>
              </div>
              <div className="w-1/2 m-auto">
                <img src={MaskImg} alt="logo" />
              </div>
            </div>
          </div>
          <div className="w-2/4 h-96 bg-[#FEC62E] rounded-3xl">
            <div className="flex justify-around items-center h-5/6">
              <div className="text-white w-1/2 text-left pl-20">
                <p className="text-xl py-1">New</p>
                <p className="text-4xl py-1 font-bold">Wear</p>
                <h3 className="py-1 text-6xl text-[#FFD76A] font-bold">
                  GADGETS
                </h3>
                <div className="bg-white text-[#FFD76A] text-xl w-36 h-12 rounded-3xl flex items-center justify-center my-3 cursor-pointer">
                  Browse
                </div>
              </div>
              <div className="w-1/2 m-auto">
                <img src={appImg} alt="logo" />
              </div>
            </div>
          </div>
        </div>

        {/* second part here */}
        <div className="w-full rounded-3xl mb-10 m-auto bg-[#A5CD40] h-[500px]">
          <div className="flex justify-center items-center">
            <div className="flex items-start flex-col relative left-[100px]">
              <p className="py-3 text-2xl">Trend</p>
              <p className="py-3 text-4xl font-bold">Devices</p>
              <p className="py-3 text-8xl">LAPTOP</p>
              <div className="bg-white w-36 h-12 rounded-3xl flex items-center justify-center my-3 cursor-pointer text-xl">
                Browse
              </div>
            </div>
            <div>
              <img src={laptopImg} alt="laptop" className="w-[800px]" />
            </div>
          </div>
        </div>

        {/* third part here */}
        <div className="flex gap-3 py-3">
          <div className="w-2/4 h-96 bg-[#1687FF] rounded-3xl">
            <div className="flex justify-center items-start h-[50vh] px-10 flex-col">
              <p className="text-xl py-1">New</p>
              <p className="text-4xl py-1 font-bold">Amazon</p>
              <h3 className="py-1 text-8xl text-[#3A98FF] font-bold">
                SPEAKER
              </h3>
              <div className="bg-white w-36 h-12 rounded-3xl flex items-center justify-center my-3 cursor-pointer text-xl">
                Browse
              </div>
            </div>
          </div>
          <div className="w-2/4 h-96 bg-[#2DD06F] rounded-3xl">
            <div className="flex justify-around items-center h-5/6">
              <div className="text-white w-1/2 text-left pl-20">
                <p className="text-xl py-1">Play</p>
                <p className="text-4xl py-1 font-bold">Game</p>
                <h3 className="py-1 text-6xl text-[#57D68B] font-bold">
                  OCULUS
                </h3>
                <div className="bg-white text-[#2DD06F] text-xl w-36 h-12 rounded-3xl flex items-center justify-center my-3 cursor-pointer">
                  Browse
                </div>
              </div>
              <div className="w-1/2 m-auto">
                <img
                  src={MenImg}
                  alt="logo"
                  className="w-[360px] h-[350px] relative right-[50px] top-[35px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* four */}
        <div className="w-full rounded-3xl my-5  m-auto bg-[#EDEDEE] h-[500px]">
          <div className=" relative">
            <div className="w-[50%] m-auto flex flex-col justify-center h-[60vh]">
              <p className="py-3 text-2xl">Trend</p>
              <p className="py-3 text-4xl font-bold">Devices</p>
              <p className="py-3 text-8xl">LAPTOP</p>
              <div className="bg-red-600 w-36 h-12 rounded-3xl flex items-center justify-center my-3 cursor-pointer text-xl text-white">
                Browse
              </div>
            </div>
            <div className="absolute right-10 top-[90px]">
              <img src={GameImg} alt="laptop" className="w-[400px]" />
            </div>
          </div>
        </div>

        {/* five icons flex here */}
        <div className="flex items-center justify-around my-5">
          <div className="flex flex-col items-center py-10">
            <LiaShippingFastSolid className="text-6xl text-[#A5CD40]" />
            <p className="font-bold py-2">Free Shipping</p>
            <p>Free Shipping On All Order</p>
          </div>
          <div className="flex flex-col items-center">
            <AiFillSafetyCertificate className="text-6xl text-[#A5CD40]" />
            <p className="font-bold py-2">Money Guarantee</p>
            <p>30 Day Money Back</p>
          </div>
          <div className="flex flex-col items-center">
            <BiHeadphone className="text-6xl text-[#A5CD40]" />
            <p className="font-bold py-2">Online Support 24/7</p>
            <p>Technical Support 24/7</p>
          </div>
          <div className="flex flex-col items-center">
            <MdPayment className="text-6xl text-[#A5CD40]" />
            <p className="font-bold py-2">Secure Payment</p>
            <p>All Cards Accepted</p>
          </div>
        </div>

        {/* six summer section here */}
        <div className="w-full bg-[#F13842] h-[300px] rounded-3xl mt-20 relative">
          <div className="flex justify-between items-center h-[35vh]">
            <div className="text-white px-10">
              <p className="">20 % OFF</p>
              <p className="text-7xl font-bold">FINE</p>
              <p className="text-7xl font-bold">SMILE</p>
              <p className="py-3">15 Nov To 7 Dec</p>
            </div>
            <div>
              <img
                src={headphoneImg}
                alt="logo"
                className="relative -top-[110px] right-[250px]"
              />
            </div>
            <div className="text-white px-10">
              <p className="py-2 font-bold text-2xl">Beats Solo Air</p>
              <p className="py-2 font-bold text-5xl">Summer Sale</p>
              <p className="w-[350px]">
                Company that's grown from 270 to 480 employes in the last 12
                months
              </p>
              <div className="bg-white text-red-600 w-[130px] h-[50px] rounded-full flex items-center justify-center cursor-pointer my-5">
                Shop
              </div>
            </div>
          </div>
        </div>

        {/* seven cards products here */}
        <div className="flex flex-col justify-center items-center py-16">
          <h3 className="font-bold text-5xl py-3">Best Seller Products</h3>
          <p className="text-[#A5CD40] text-xl py-3">speaker There are many variations passages</p>
        </div>
      </div>
    </>
  );
};

export default Home;
