import React, { useState, useEffect, memo } from "react";
import { Download } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";

const Aabout = memo(({ data }) => {
  const { title2, content2, image2, title3, content3, image3, image1 } = data || {};

  const [image1Loaded, setImage1Loaded] = useState(false);
  const [image2Loaded, setImage2Loaded] = useState(false);
  const [image3Loaded, setImage3Loaded] = useState(false);
  const [image1Src, setImage1Src] = useState(null);
  const [image2Src, setImage2Src] = useState(null);
  const [image3Src, setImage3Src] = useState(null);

  useEffect(() => {
    if (image2) {
      setImage2Src(image2);
      const img = new Image();
      img.src = image2;
      img.onload = () => setImage2Loaded(true);
      img.onerror = () => setImage2Loaded(false);
    } else {
      setImage2Loaded(false);
      setImage2Src(null);
    }
  }, [image2]);

  useEffect(() => {
    if (image3) {
      setImage3Src(image3);
      const img = new Image();
      img.src = image3;
      img.onload = () => setImage3Loaded(true);
      img.onerror = () => setImage3Loaded(false);
    } else {
      setImage3Loaded(false);
      setImage3Src(null);
    }
  }, [image3]);

  useEffect(() => {
    if (image1) {
      setImage1Src(image1);
      const img = new Image();
      img.src = image1;
      img.onload = () => setImage1Loaded(true);
      img.onerror = () => setImage1Loaded(false);
    } else {
      setImage1Loaded(false);
      setImage1Src(null);
    }
  }, [image1]);

  return (
    <div className="bg-white w-full pb-8 h-fit px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between py-5 md:py-10 w-full lg:gap-20 md:12">
        <div className="w-full flex md:w-1/2">
          <div className="mb-4 ">
            <div className="w-12 h-2 bg-[#333333] mb-4"></div>
            <h2 className="text-2xl md:text-3xl inter font-semibold text-[#333333] mb-4">
              {title2}
            </h2>
            <p className=" text-[17px] font-light leading-7 text-justify poppins text-[#424242] ">
             {content2}
            </p>
          </div>
        </div>
       <div className="w-full md:w-1/2 mb-4 lg:mb-0">
          {!image1Loaded || !image1Src ? (
            <Skeleton variant="rectangular" width="100%" height={400} />
          ) : (
            <img
              src={image1Src}
              alt={title2 || "Mission Image"}
              className="w-full h-82 object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between py-5 md:py-10 w-full lg:gap-20 md:12">
        <div className="w-full md:w-1/2 mb-4 lg:mb-0">
          {!image3Loaded || !image3Src ? (
            <Skeleton variant="rectangular" width="100%" height={400} />
          ) : (
            <img
              src={image3Src}
              alt="Featured content"
              className="w-full h-82 object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        <div className="w-full flex md:w-1/2">
          <div className=" ">
            <div className="w-12 h-2 bg-[#333333] mb-4"></div>
            <h2 className="text-2xl md:text-3xl inter font-semibold text-[#424242] mb-4">
            {title3}
            </h2>
            <p className=" text-[17px] font-light leading-7 text-justify poppins text-[#333333] ">
             {content3}
            </p>
          </div>
        </div>
      </div>
      <div className="relative mt-5 mb-14 lg:px-15 md:px-10 px-5">
        <h2 className="text-xl font-semibold poppins  mb-2">
          Download Our Brochure
        </h2>
        <div className="border-2 max-w-80 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors group">
          <a href="/brochure.pdf" download className="block w-full h-full">
            <Download className="mx-auto h-12 w-12 text-gray-400 mb-2 group-hover:text-gray-500 transition-colors" />
            <p className="text-sm text-gray-600 mb-1 group-hover:text-gray-700 transition-colors">
              Download Brochure
            </p>
            <p className="text-xs text-gray-500">PDF format</p>
          </a>
        </div>
      </div>
    </div>
  );
});

export default Aabout;
