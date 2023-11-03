import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from "react-responsive-carousel";
import OneImg from "../components/images/banner/one.jpg";
import TwoImg from "../components/images/banner/two.jpg";
import ThreeImg from "../components/images/banner/three.jpg";
import FourImg from "../components/images/banner/four.jpg";
import FiveImg from "../components/images/banner/five.webp";

const Banner = () => {
  return (
    <div className="mt-3 w-full h-2/4">
      <Carousel
        autoPlay={true}
        interval={3000} // Adjust the interval as needed (in milliseconds)
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        className="h-2/4"
      >
        <div>
          <img src={OneImg} alt="Slide 1" className="w-full h-96"/>
        </div>
        <div>
          <img src={TwoImg} alt="Slide 2" className="w-full h-96"/>
        </div>
        <div>
          <img src={ThreeImg} alt="Slide 3" className="w-full h-96"/>
        </div>
        <div>
          <img src={FourImg} alt="Slide 5" className="w-full h-96"/>
        </div>
        <div>
          <img src={FiveImg} alt="Slide 6" className="w-full h-96"/>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
