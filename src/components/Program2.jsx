import React, { useState, useEffect, memo } from "react";
import { MoveRightIcon } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";

// Accept the 'data' prop from the parent component
const Program2 = memo(({ data }) => {
  const { title, content, image } = data || {};
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (image) {
      setImageSrc(image);
      const img = new Image();
      img.src = image;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false); 
    } else {
      setImageLoaded(false);
      setImageSrc(null);
    }
  }, [image]);

  return (
    <div className="lg:px-15 md:px-10 px-5 home-2 py-10">
      <div className="bg-[#c5ac8e] p-15 md:px-9 px-4 rounded-sm py-10">
        <div className="flex flex-col text-center gap-2 md:text-start md:flex-row md:justify-between justify-center item-center ">
          <h1 className="font-bold md:max-w-[600px] w-full text-2xl md:text-[35px] capitalize">
            {title }
          </h1>
          <div className="md:max-w-[389px] w-full flex flex-col justify-center">
            <p className="text-[17px] mb-3 font-light poppins">
              {content }
            </p>
            <div className="py-3 px-1 flex bg-white rounded-sm max-w-[330px] gap-x-5 items-center h-[50px]">
              <button className="bg-[#19392c] font-medium text-white rounded-[5px] py-2 px-5">
                Student
              </button>
              <p className="text-[16px] font-semibold text-[#333333]">
                Employer{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full md:h-[600px] h-[400px] mt-10">
          {!imageLoaded || !imageSrc ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <img
              src={imageSrc}
              alt={title || "Training programs"}
              className="w-full md:h-full h-[400px] object-cover rounded-lg"
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="absolute bottom-5 left-5 bg-white rounded-sm p-5 pt-10 max-w-[330px]">
            <h1 className="text-[36px] font-semibold text-[#333333]">
              Student
            </h1>
            <p className="text-[17px] mb-3 font-light text-[#333333]">
              Empowering you to grow, learn, and succeed – your journey starts
              here!
            </p>
            <hr className="w-full h-0.5 bg-[#333333]" />
            <div className="flex justify-start gap-x-2 mt-4">
              <div>
                <div className="font-semibold text-[38px] mb-3">
                  50<span className="text-[#AD8862]">+</span>
                </div>
                <p className="font-light text-[#333333] text-base">Courses</p>
              </div>
              <div>
                <div className="font-semibold text-[38px] mb-3">
                  20<span className="text-[#AD8862]">+</span>
                </div>
                <p className="font-light text-[#333333] text-base">Program</p>
              </div>
            </div>
            <Link to="/programs">
              <MoveRightIcon
                className="text-[#333333] absolute right-6 bottom-3 rounded-full border-1 border-[#333333] p-1 cursor-pointer"
                size={30}
              />{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Program2;