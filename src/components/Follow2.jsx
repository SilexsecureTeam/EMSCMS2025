import React, { useState, useEffect, memo } from "react";
import cake from "../assets/ins.jpg";
import bedroom from "../assets/linked.jpg";
import decoration from "../assets/facebok.jpg";
import twi from "../assets/twi.jpg";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si";
import Skeleton from "@mui/material/Skeleton";
// import { NavLink } from "react-router-dom";

const Follow2 = memo(() => {
  const [imageLoaded, setImageLoaded] = useState({});

  const images = React.useMemo(
    () => [
      {
        src: cake,
        platform: "Instagram",
        username: "@ems_abuja",
        icon: <FaInstagram className="text-black bg-white p-0.5" size={20} />,
        path: "https://www.instagram.com/EMS_Abuja",
      },
      {
        src: bedroom,
        platform: "LinkedIn",
        username: "The Etiquette and Management School",
        icon: <FaLinkedinIn className="text-black bg-white p-0.5" size={20} />,
        path: "",
      },
      {
        src: decoration,
        platform: "Facebook",
        username: "@The Etiquette and Management School",
        icon: <FaFacebookF className="text-black bg-white p-0.5" size={20} />,
        path: "",
      },
      {
        src: twi,
        platform: "Twitter",
        username: "@EMS_Abuja",
        path: "https://x.com/EMS_Abuja",
        icon: <SiX className="text-black bg-white p-0.5" size={20} />,
      },
    ],
    []
  );

  useEffect(() => {
    images.forEach((item, index) => {
      const img = new Image();
      img.src = item.src;
      img.onload = () => {
        setImageLoaded((prev) => ({ ...prev, [index]: true }));
      };
    });
  }, [images]);

  const handleLinkClick = (e, path) => {
    e.preventDefault(); // Prevent any default navigation
    e.stopPropagation(); // Stop event bubbling to parent elements
    if (path && path !== "#") {
      window.open(path, "_blank", "noopener,noreferrer"); // Programmatically open valid URLs in a new tab
    }
  };

  return (
    <section className="lg:px-15 md:px-10 px-5 home-2 pb-20">
      <h1 className="font-semibold md:text-[35px] text-2xl text-center text-[#333333] mb-5 mt-2">
        Follow us on
      </h1>
      {/* <p className="text-[16px] max-w-[655px] font-normal text-[#333333] mb-4 text-center mx-auto">
        Lorem ipsum dolor sit amet consectetur. Viverra vivamus tempus hac
        ornare eget dolor sit amet consectedolor sit amet consectetur.
      </p> */}
      <div className="grid grid-cols-1 mb-8 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((item, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg"
          >
            <a
              href={item.path || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleLinkClick(e, item.path)}
            >
              <div className="absolute top-2 left-2 w-fit font-medium items-center space-x-2 text-white text-[12px] p-2 rounded-t-lg z-10">
                {item.icon}
                <div>{item.username}</div>
              </div>
            </a>
            {!imageLoaded[index] ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
              <img
                src={item.src}
                alt={`Image ${index + 1}`}
                className="w-full h-[300px] object-cover"
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="absolute inset-0 bg-black opacity-50 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg" />
          </div>
        ))}
      </div>
      <button className="rounded-md bg-[#19392c] text-[16px] sm:text-[18px] font-semibold text-white px-4 py-2 hover:bg-[#2a503e] transition duration-300 mx-auto block">
        Follow us
      </button>
    </section>
  );
});

export default Follow2;
