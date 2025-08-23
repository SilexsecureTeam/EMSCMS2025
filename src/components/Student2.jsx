import React, { useState, useEffect, memo } from "react";
import { MoveRightIcon, MoveUpIcon } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";

// Accept the 'data' prop from the parent component
const Student2 = memo(({ data }) => {
  // Destructure the props with a fallback
  const { title, content, image } = data || {};
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (image) {
      setImageSrc(image);
      const img = new Image();
      img.src = image;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false); // Handle image loading errors
    } else {
      setImageLoaded(false);
      setImageSrc(null);
    }
  }, [image]);

  return (
    <div className="md:p-10 md:py-10 py-4 lg:px-15 md:px-10 px-5 home-2">
      <h1 className="font-bold text-[#333333] mx-auto block md:max-w-[675px] mb-4 w-full text-center text-2xl capitalize lg:text-[35px]">
        {title}
      </h1>
      <p className="text-[17px] mx-auto block text-center md:max-w-[675px] w-full mb-3 font-light text-[#555]">
        {content || ""}
      </p>

      <div className="relative w-full gap-10 mt-10">
        {!imageLoaded || !imageSrc ? (
          <Skeleton variant="rectangular" width="100%" height={600} />
        ) : (
          <img
            src={imageSrc}
            alt={title || "Student writing"}
            className="object-cover w-full h-[600px] rounded-sm"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="absolute w-full h-full right-0 bottom-0 inset-0 bg-black/30"></div>
        <div className="bg-white absolute right-2 bottom-2 md:bottom-16 z-30 rounded-lg shadow-md p-5 w-fit">
          <div className="flex justify-between items-center mb-3.5">
            <h2 className="font-semibold text-[#333333] text-lg md:text-xl">
              World-class teachers
            </h2>
            <Link to="/programs">
              <MoveUpIcon
                className="text-[#6C4F40] border border-[#6C4F40] rounded-full p-1 cursor-pointer hover:bg-[#6C4F40]/10 transition"
                size={24}
              />
            </Link>
          </div>
          <p className="font-normal max-w-[380px] text-sm md:text-[17px] text-[#333333] mb-2.5">
            Learn from the best! Our expert educators inspire and guide you to
            reach your full potential.
          </p>
          <hr className="w-full h-[1px] opacity-40 mb-5 bg-[#000000]" />
          <div className="flex justify-between items-center mb-3.5">
            <h2 className="font-semibold text-[#333333] text-lg md:text-xl">
              Well-equipped facilities
            </h2>
            <Link to="/programs">
              <MoveUpIcon
                className="text-[#6C4F40] border border-[#6C4F40] rounded-full p-1 cursor-pointer hover:bg-[#6C4F40]/10 transition"
                size={24}
              />
            </Link>
          </div>
          <p className="font-normal max-w-[380px] text-sm md:text-[17px] text-[#333333] mb-2.5">
            State-of-the-art infrastructure and cutting-edge technology to fuel
            your creativity and innovation.
          </p>
          <hr className="w-full h-[1px] opacity-40 mb-5 bg-[#000000]" />
          <div className="flex justify-between items-center mb-3.5">
            <h2 className="font-semibold text-[#333333] text-lg md:text-xl">
              A lifetime of connection
            </h2>
            <Link to="/programs">
              <MoveUpIcon
                className="text-[#6C4F40] border border-[#6C4F40] rounded-full p-1 cursor-pointer hover:bg-[#6C4F40]/10 transition"
                size={24}
              />
            </Link>
          </div>
          <p className="font-normal max-w-[380px] text-sm md:text-[17px] text-[#333333] mb-2.5">
            Join our community and build lasting relationships with peers and
            mentors that open doors to new opportunities.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-10">
      </div>
    </div>
  );
});

export default Student2;