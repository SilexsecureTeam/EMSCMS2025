import React, { useState, useEffect, memo } from "react";
import woman from "../assets/businesswoman.jpg";
import { FileChartColumnIncreasingIcon, MoveRight } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";

const Differnt2 = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = woman;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="w-full py-8 md:py-20 lg:px-15 md:px-10 px-5 home-2">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="relative w-full lg:w-1/2 mb-8 lg:mb-0">
          {!imageLoaded ? (
            <Skeleton variant="rectangular" width="100%" height={400} />
          ) : (
            <img
              src={woman}
              alt="Featured content"
              className="w-full h-auto object-cover rounded-lg shadow-md"
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="absolute w-full h-full right-0 bottom-0 inset-0 bg-black/50"></div>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:items-center lg:w-1/2 lg:pl-7">
          <div className="md:max-w-[400px] ">
            <h2 className="text-3xl lg:max-w-[325px] w-full md:text-[48px] md:leading-12 font-bold text-[#333333] mb-4">
              What makes us different
            </h2>
            <p className="mb-10 text-base max-w-[402px] font-normal text-[#333333] ">
              Lorem ipsum dolor sit amet consectetur. Tortor elit magna etiam in
              facilisi ultrices ut in. Tortor elit
            </p>
            <div className="flex gap-x-3 pl-5 mb-1 items-center">
              <FileChartColumnIncreasingIcon size={20} color="#333333" />
              <p className="text-[#333333] font-semibold text-[20px]">
                Specialized programs
              </p>
            </div>
            <p className="text-base font-normal mb-3">
              Lorem ipsum dolor sit amet consectetu
            </p>
            <div className="flex gap-x-3 pl-5 mb-1 items-center">
              <FileChartColumnIncreasingIcon size={20} color="#333333" />
              <p className="text-[#333333] font-semibold text-[20px]">
                Personalised business service
              </p>
            </div>
            <p className="text-base font-normal mb-3">
              Lorem ipsum dolor sit amet consectetu
            </p>
            <button className="mt-3 ml-3 bg-[#193728] text-[21px] font-semibold cursor-pointer text-white px-3 py-1.5">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Differnt2;
