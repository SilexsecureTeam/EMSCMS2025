// Hero2.jsx (updated)

import React, { useState, useEffect, useRef } from "react";
import { Book, FolderOpenDotIcon, GraduationCapIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Accept 'sliders', 'header', and 'description' as props
const Hero2 = ({ sliders, header, description }) => {
  const images = sliders;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  if (!images || images.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No slider images available.
      </div>
    );
  }

  // Your existing useEffect for auto-play remains the same
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [isDragging, images.length]);

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentSlide === images.length) {
        setCurrentSlide(0);
      }
    };
    const sliderNode = sliderRef.current?.firstChild;
    if (sliderNode) {
      sliderNode.addEventListener("transitionend", handleTransitionEnd);
    }
    return () => {
      if (sliderNode) {
        sliderNode.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [currentSlide, images.length]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    const x = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    setStartX(x);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const x = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    const diff = x - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    const movedBy = translateX;
    if (Math.abs(movedBy) > threshold) {
      if (movedBy > 0) {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
      } else {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }
    }
    setTranslateX(0);
  };

  return (
    <div
      className="relative bg-white w-full h-fit overflow-hidden"
      ref={sliderRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Background slider with dark overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(${
              -currentSlide * 100 + (translateX / window.innerWidth) * 100
            }%)`,
            transition: isDragging ? "none" : "transform 500ms ease-in-out",
          }}
        >
          {images.map((img, index) => (
            <div key={index} className="min-w-full h-full">
              <img
                src={img} // Now uses the image path string directly
                alt={`slide-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      </div>

      {/* Hero Content (z-20 ensures it stays above overlay) */}
      <div className="relative z-20 flex flex-col md:flex-row md:justify-between min-h-fit px-4 md:px-8">
        <div className="h-fit flex items-center justify-center text-white pt-19 md:pt-40 w-full md:justify-start">
          <div className="md:text-start text-center">
            <h1 className="md:text-[53px] poppins text-2xl md:leading-[3.0rem] leading-10 font-semibold md:max-w-[620px] md:mb-4 mb-2">
              {header}
            </h1>
            <p className="text-lg py-8 font-medium md:text-xl sm:max-w-[300px] md:max-w-[560px] mb-3">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Second Section (moved outside the first section's div) */}
      <div className="relative z-20 mt-5 mb-4 px-4 md:px-8">
        <div
          onClick={() => navigate("/programs")}
          className="flex w-full mx-auto gap-5 bg-[#F1ECE3] flex-wrap md:px-7 px-4 md:py-4 py-2 justify-between items-center cursor-pointer"
        >
          {[
            {
              icon: <Book size={22} color="#193728" className="mb-2" />,
              title: "Explore Courses",
              text: "Master skills for hospitality and etiquette",
            },
            {
              icon: (
                <FolderOpenDotIcon size={22} color="#193728" className="mb-2" />
              ),
              title: "Browse Resources",
              text: "Essential reads for service excellence",
            },
            {
              icon: (
                <GraduationCapIcon size={22} color="#193728" className="mb-2" />
              ),
              title: "Explore Events",
              text: "Discover events that build your career.",
            },
          ].map((section, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-1 w-full md:w-fit border-b-2 md:border-b-0 border-[#333333] pb-2"
            >
              {section.icon}
              <p className="md:text-lg text-base text-[#333333] font-bold">
                {section.title}
              </p>
              <p className="text-[#333333] font-normal text-[12px] md:text-[14px]">
                {section.text}
              </p>
              <a href="#" className="text-[#333333] text-[14px] font-semibold">
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero2;