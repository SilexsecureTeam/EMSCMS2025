import React, { useState, useEffect, memo } from "react";
import { MoveRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const Misson2 = memo(({ data }) => {
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
    <section className="w-full py-20 lg:px-15 md:px-10 px-5 home-2">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          {!imageLoaded || !imageSrc ? (
            <Skeleton variant="rectangular" width="100%" height={440} />
          ) : (
            <img
              src={imageSrc}
              alt={title || "Featured content"}
              className="w-full h-[440px] md:object-fill object-cover shadow-md"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        <div className="w-full flex justify-center lg:w-1/2 ">
          <div className=" ">
         <h2
  className="text-xl md:text-[35px] max-w-[450px] poppins font-semibold text-[#333333] mb-4"
  style={{ lineHeight: 1.2 }}
>  {title}
</h2>
            <div className="mb-7 text-[17px] font-light poppins max-w-[418px] text-[#333333]">
              {content && content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex gap-x-2 items-center justify-center md:justify-start">
              <NavLink to="/programs">
                <button className="mt-1 bg-[#19392c] font-semibold md:text-[21px] text-[12px] px-3 py-1.5 cursor-pointer text-white">
                  <div className="flex items-center space-x-2.5">
                    <h4 className="font-semibold md:text-[18px] text-[14px] text-white">
                      Explore Courses
                    </h4>
                    <MoveRight
                      className="border-1 border-white p-[3px] rounded-full"
                      size={16}
                      color="white"
                    />
                  </div>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Misson2;