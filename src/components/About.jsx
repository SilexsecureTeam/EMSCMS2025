import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const About = memo(({ data }) => {
  const { title1, content1, image1 } = data || {};
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(null);

  React.useEffect(() => {
    if (image1) {
      setImageSrc(image1);
      const img = new Image();
      img.src = image1;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false);
    } else {
      setImageLoaded(false);
      setImageSrc(null);
    }
  }, [image1]);

  // Split content into three paragraphs using the key phrases
  let firstParagraph = "";
  let secondParagraph = "";
  let thirdParagraph = "";

  if (content1) {
    // Find the indexes of the split phrases
    const focusIdx = content1.indexOf("At EMS, we focus on");
    const progIdx = content1.indexOf("Our programmes cater to");

    if (focusIdx !== -1 && progIdx !== -1) {
      firstParagraph = content1.substring(0, focusIdx).trim();
      secondParagraph = content1.substring(focusIdx, progIdx).trim();
      thirdParagraph = content1.substring(progIdx).trim();
    } else if (focusIdx !== -1) {
      firstParagraph = content1.substring(0, focusIdx).trim();
      secondParagraph = content1.substring(focusIdx).trim();
    } else {
      firstParagraph = content1;
    }
  }

  return (
    <div className="bg-white w-full">
      <div>
        <div className="w-full relative h-[50vh] md:h-[80vh]">
          {!imageLoaded || !imageSrc ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <img
              src={imageSrc}
              alt={title1}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-40 z-10"></div>
          <h1 className="poppins absolute bottom-[30%] w-full text-center font-semibold text-3xl md:text-6xl text-white">
            About Us
          </h1>
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
          {/* Top border + Heading */}
          <div className="mb-6">
            <div className="w-12 h-2 bg-[#333333] mb-4"></div>
            <h2 className="text-3xl inter md:text-5xl font-semibold text-[#333333]">
              {title1 || "Who We Are"}
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column (first and second paragraphs) */}
            <div className="space-y-8">
              <p className="text-[17px] font-light leading-6 text-[#333333]">
                {firstParagraph || "Default paragraph one."}
              </p>
              <p className="text-[17px] font-light leading-6 text-[#333333]">
                {secondParagraph || "Default paragraph two."}
              </p>
            </div>

            {/* Right Column (third paragraph + button) */}
            <div className="flex flex-col justify-start space-y-8">
              <p className="text-[17px] font-light leading-6 text-[#333333]">
                {thirdParagraph || "Default paragraph three."}
              </p>
              <NavLink to="/programs">
                <button className="inline-flex items-center cursor-pointer justify-center w-max bg-[#19392c] text-white font-medium text-base md:text-lg px-6 py-3 hover:bg-[#193728a4] rounded-md transition">
                  Explore Courses
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default About;