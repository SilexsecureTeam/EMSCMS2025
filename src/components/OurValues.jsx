import React, { useState, useEffect, memo } from "react";
import Skeleton from "@mui/material/Skeleton";
import { NavLink } from "react-router-dom";
import {
  ShieldCheck,
  Handshake,
  Landmark,
  TrendingUp,
  Rocket,
  HeartHandshake,
} from "lucide-react";
import PageManagement from "../hooks/management";

// Map icon string from API to Lucide component
const iconMap = {
  ShieldCheck: <ShieldCheck className="text-[#193728]" size={24} />,
  Handshake: <Handshake className="text-[#193728]" size={24} />,
  Landmark: <Landmark className="text-[#193728]" size={24} />,
  TrendingUp: <TrendingUp className="text-[#193728]" size={24} />,
  Rocket: <Rocket className="text-[#193728]" size={24} />,
  HeartHandshake: <HeartHandshake className="text-[#193728]" size={24} />,
};

const OurValues = memo(({ data }) => {
  const { title4, content4, image4 } = data || {};
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Move this to component level
  const { getValues } = PageManagement();

  useEffect(() => {
    if (image4) {
      setImageSrc(image4);
      const img = new Image();
      img.src = image4;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false);
    } else {
      setImageLoaded(false);
      setImageSrc(null);
    }
  }, [image4]);

  useEffect(() => {
    const fetchValues = async () => {
      setLoading(true);
      try {
        // Check if getValues exists
        if (!getValues) {
          console.error('getValues function not found in PageManagement');
          setValues([]);
          return;
        }
        
        const response = await getValues();
        console.log(response, "values response");
        
        // Handle different response structures
        let valueList = [];
        if (Array.isArray(response)) {
          valueList = response;
        } else if (response?.data) {
          valueList = Array.isArray(response.data) ? response.data : [response.data];
        } else if (response) {
          valueList = [response];
        }
        
        console.log("Processed values:", valueList);
        setValues(valueList);
      } catch (error) {
        console.error("Failed to fetch values:", error);
        setValues([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchValues();
  }, []);

  return (
    <section className="pb-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="w-12 h-2 bg-[#333333] mb-4"></div>
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[#333333] inter mb-10">
          Our Values
        </h2>

       
        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} variant="rectangular" height={120} />
            ))
          ) : values.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No values found
            </div>
          ) : (
            values.map((value, index) => (
              <div
                key={value.id || index}
                className="bg-white rounded-md p-6 space-y-3 h-full border shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-[#8C62394D] p-1.5 rounded-full flex-shrink-0">
                    {iconMap[value.icon] || <ShieldCheck className="text-[#193728]" size={24} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[15px] mb-3 poppins font-bold text-[#333333]">
                      {value.title || 'No Title'}
                    </h3>
                    <p className="text-sm font-light leading-7 poppins text-[#333333]">
                      {value.content || 'No Content'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between py-10 md:pt-15 w-full lg:gap-20 md:12">
        <div className="w-full md:w-1/2 mb-4 lg:mb-0">
          {!imageLoaded || !imageSrc ? (
            <Skeleton variant="rectangular" width="100%" height={360} />
          ) : (
            <img
              src={imageSrc}
              alt={title4 || "Our Programmes Image"}
              className="w-full h-82 md:h-110 object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        <div className="w-full flex md:w-1/2">
          <div className="space-y-9">
            <div>
              <div className="w-12 h-2 bg-[#333333] mb-4"></div>
              <h2 className="text-2xl md:text-3xl inter font-semibold text-[#424242] mb-4">
                {title4 || "Our Programmes"}
              </h2>
            </div>
            <p className="text-[18px] font-light leading-9 poppins text-[#333333]">
              {content4 || "All courses at EMS are held in person at our state-of-the-art facility in Abuja..."}
            </p>
            <NavLink to="/programs">
              <button className="block rounded-sm bg-[#19392c] text-[16px] font-semibold cursor-pointer text-white px-5 py-2.5">
                Explore Courses
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
});

export default OurValues;