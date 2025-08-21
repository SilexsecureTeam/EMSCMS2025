import React, { useState, useEffect, memo } from "react";
import logo from "../assets/Group.svg";
import { PlayIcon } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import { NavLink } from "react-router-dom";
import face from "../assets/facebook.svg";
import insta from "../assets/instagram.svg";
import twi from "../assets/twitter.svg";
import lin from "../assets/linkedin.svg";

// Accept the 'data' prop from the parent component
const Footer2 = memo(({ data }) => {
  // Destructure the props with a fallback to avoid errors
  const { description, greenTitle, greenDescription } = data || {};
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = logo;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="bg-[#F1F8F3] homie-2 text-[#333333]">
      <div className="py-16 w-full lg:px-15 md:px-10 px-5 flex flex-1 flex-wrap justify-between items-start text-white">
        <div className="max-w-[320px] mb-8">
          {!imageLoaded ? (
            <Skeleton
              variant="rectangular"
              width={250}
              height={48}
              className="mb-5"
            />
          ) : (
            <img
              src={logo}
              alt="logo"
              className="mb-5 w-[250px]"
              loading="lazy"
              decoding="async"
            />
          )}
          <p className="mb-5 max-w-[320px] font-normal text-[14px] text-[#333333]">
            {description || "The Etiquette and Management School (EMS) is a premier institution dedicated to providing individuals with exceptional training..."}
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/EMS_Abuja" target="_blank" rel="noopener noreferrer">
              <img src={insta} alt="instagram" className="text-white w-[22px] h-[22px] cursor-pointer bg-[#19392c]" size={22} />
            </a>
            <a href="https://x.com/EMS_Abuja" target="_blank" rel="noopener noreferrer">
              <img src={twi} alt="twitter" className="text-white w-[22px] h-[22px] cursor-pointer bg-[#19392c]" size={22} />
            </a>
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <img src={face} alt="facebook" className="text-white w-[22px] h-[22px] cursor-pointer bg-[#19392c]" size={22} />
            </a>
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              <img src={lin} alt="linkedin" className="text-white w-[22px] h-[22px] cursor-pointer bg-[#19392c]" size={22} />
            </a>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-[16px] text-black font-bold mb-4.5">
            Useful Links:
          </h2>
          <div className="grid gap-1.5 font-normal text-[#333333] text-[14px]">
            <NavLink to="/"><h4 className="flex items-center space-x-2 itemx text-[14px] font-normal text-[#333333]"><PlayIcon size={12} fill="#000000" className="mr-2" /> Home</h4></NavLink>
            <NavLink to="/about"><h4 className="flex items-center space-x-2 text-[14px] font-normal text-[#333333]"><PlayIcon size={12} fill="#000000" className="mr-2" /> About us</h4></NavLink>
            <NavLink to="/programs"><h4 className="flex items-center space-x-2 text-[14px] font-normal text-[#333333]"><PlayIcon size={12} fill="#000000" className="mr-2" /> Programmes</h4></NavLink>
            <NavLink to="/contact"><h4 className="flex items-center space-x-2 text-[14px] font-normal text-[#333333]"><PlayIcon size={12} fill="#000000" className="mr-2" /> Contact Us</h4></NavLink>
            <NavLink to="/gallery"><h4 className="flex items-center space-x-2 text-[14px] font-normal text-[#333333]"><PlayIcon size={12} fill="#000000" className="mr-2" /> Gallery</h4></NavLink>
            <NavLink to="/blog"><h4 className="flex items-center space-x-2 text-[14px] font-normal text-[#333333]"><PlayIcon size={12} fill="#000000" className="mr-2" /> Blog</h4></NavLink>
            <NavLink to="/hire"><h4 className="flex items-center space-x-2 text-[14px] font-normal text-[#333333]"><PlayIcon size={12} fill="#000000" className="mr-2" /> Hire a staff</h4></NavLink>
          </div>
        </div>
        <div className="">
          <h2 className="text-[16px] text-black font-bold mb-2">
            {greenTitle || "Subscribe"}
          </h2>
          <input
            type="text"
            placeholder="Enter your mail"
            className="text-black font-medium text-xl py-2 px-1 mb-4 w-full outline-none bg-[#E7E7E7]"
          />
          <button className="bg-[#19392c] px-3 py-1.5 font-normal cursor-pointer">
            SUBSCRIBE NOW
          </button>
        </div>
      </div>
      <h2 className="text-center pt-5 pb-4 font-normal bg-[#19392c] text-white w-full">
        {greenDescription || "© The Etiquette and Management School. || 2025 All Rights Reserved."}
      </h2>
    </div>
  );
});

export default Footer2;