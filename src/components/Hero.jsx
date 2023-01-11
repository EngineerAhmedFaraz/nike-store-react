import React from "react";
import "../index.css";

const Hero = ({
  heroapi: { title, subtitle, btntitle, img, sociallinks, video },
}) => {
  return (
    <>
      <div className="relative w-auto h-auto flex flex-col ">
        <div className="bg-theme  clip-path absolute top-0 left-0 right-0 h-[85vh] lg:h-[75px] md:h-[65px] sm:h-[55px] w-auto opacity-100 z-10"></div>
        <div className="">
          <div className="">
            <h1>{title}</h1>
            <h1>{subtitle}</h1>
            <button>{btntitle}</button>
            {/* <div className=""></div>
            <div className=""></div> */}
          </div>
          <div className="">
            <img src={img} alt="hero/img/img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
