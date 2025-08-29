import React, { useState, useEffect, memo } from "react";
import logo from "../assets/Group.svg";
import { PlayIcon } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import { NavLink } from "react-router-dom";
import face from "../assets/facebook.svg";
import insta from "../assets/instagram.svg";
import twi from "../assets/twitter.svg";
import lin from "../assets/linkedin.svg";
import CreateReviewUser from "./Dashboard/Review/CreateUserReview";

const Footer2 = memo(({ data }) => {
  const { description, greenTitle, greenDescription } = data || {};
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

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
            {description}
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/EMS_Abuja" target="_blank" rel="noopener noreferrer">
              <img src={insta} alt="instagram" className="text-white w-[22px] h-[22px] cursor-pointer bg-[#19392c]" size={22} />
            </a>
            <a href="https://x.com/EMS_Abuja" target="_blank" rel="noopener noreferrer">
              <img src={twi} alt="twitter" className="text-white w-[22px] h-[22px] cursor-pointer bg-[#19392c]" size={22} />
            </a>
            <a href="https://www.facebook.com/share/163L6LZhYo/?mibextid=wwXlfr" target="_blank" rel="noopener noreferrer">
              <img src={face} alt="facebook" className="text-white w-[22px] h-[22px] cursor-pointer bg-[#19392c]" size={22} />
            </a>
            <a href="https://www.linkedin.com/company/the-etiquette-and-management-school-limited/" target="_blank" rel="noopener noreferrer">
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
             <div className="pt-5">
          <button
            className="bg-[#19392c] text-white px-4 py-2 rounded mb-4"
            onClick={() => setShowReviewModal(true)}
          >
            Leave a review
          </button>
        </div>
        </div>
     
      </div>
      {/* Modal for CreateReviewUser */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Submit Review</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            <CreateReviewUser onSuccess={() => setShowReviewModal(false)} />
        </div>
        </div>
      )}
      <h2 className="text-center pt-5 pb-4 font-bold bg-[#19392c] text-white w-full">
        {greenDescription || `© ${new Date().getFullYear()} The Etiquette and Management School. All rights reserved.`}
      </h2>
    </div>
  );
});

export default Footer2;