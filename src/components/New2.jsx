import React, { useState, useEffect, memo } from "react";
import maid from "../assets/chambermaid.jpg";
import {
  CalendarDaysIcon,
  ChevronRightIcon,
  MoveRight,
  TimerIcon,
} from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";

const New2 = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = maid;
    img.onload = () => setImageLoaded(true);
  }, []);

  const events = [
    {
      id: 1,
      title: "3-month Graduate training",
      description: " ",
      date: "30th June - 30th September",
      time: "9:00 am - 5:00pm",
      path: "/programs",
    },
    {
      id: 2,
      title: "2-week Foreign nanny training",
      description: "",
      date: "7th July - 18th July",
      time: "9:00 am - 5:00pm",
      path: "/nanny-training",
    },
    {
      id: 3,
      title: "2-week housekeeper training",
      description: "",
      date: "7th July - 18th July",
      time: "9:00 am - 5:00pm",
      path: "/house-keeper",
    },
  ];

  return (
    <div className="py-8 lg:px-15 md:px-10 px-5 home-2 bg-gray-100">
      <div className="w-full mx-auto">
        <h1 className="font-semibold mb-4 text-[#333333] text-center sm:text-start text-2xl md:text-[35px]">
          News & Events
        </h1>
        {/* <div className="flex flex-col sm:flex-row justify-between mb-6 items-center gap-4">
          <p className="text-[14px] opacity-0 sm:text-[16px] text-[#333333] font-normal text-center sm:text-start max-w-md">
            Lorem ipsum dolor sit
          </p>
          <button className="rounded-md bg-[#19392c] text-[16px] sm:text-[18px] font-semibold text-white px-4 py-2 hover:bg-[#2a503e] transition duration-300">
            Browse all articles
          </button>
        </div> */}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full relative rounded-lg overflow-hidden">
            {!imageLoaded ? (
              <Skeleton variant="rectangular" width="100%" height={400} />
            ) : (
              <img
                src={maid}
                alt="Chambermaid working"
                className="w-full h-64 sm:h-80 md:h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="absolute w-full h-full right-0 bottom-0 inset-0 bg-black/50"></div>
            <div className="absolute md:bottom-5 md:left-5 bottom-2 left-2 bg-[#CFBDA2] p-4 sm:p-6">
              <p className="max-w-[429px] mb-2 font-semibold text-[18px] sm:text-[22px] md:text-[24px] text-[#333333]">
                How to make your etiquette training application stand out
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button className="rounded-md bg-[#19392c] text-[14px] font-semibold text-white px-3 py-1.5 hover:bg-[#2a503e] transition">
                  Management
                </button>
                <div className="flex items-center gap-x-2">
                  <CalendarDaysIcon size={16} color="#333333" />
                  <p className="text-[14px] sm:text-base font-semibold text-[#333333]">
                    Mar 17, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[#333333] font-semibold text-[20px] sm:text-[24px] md:text-[28px]">
                Upcoming Events
              </p>
              <Link to="news">
                <p className="flex items-center gap-x-2 hover:underline">
                  <span className="text-[14px] sm:text-[16px] font-semibold text-[#333333]">
                    Browse all
                  </span>
                  <ChevronRightIcon size={20} color="#333333" />
                </p>
              </Link>
            </div>
            <hr className="w-full border-[#333333] mb-6" />

            {events.map((event) => (
              <div key={event.id} className="w-full mb-6">
                <div className="flex justify-between mb-2 items-center">
                  <h2 className="mb-2 text-[#333333] capitalize  font-semibold text-[18px] sm:text-[20px] md:text-[22px]">
                    {event.title}
                  </h2>
                  <Link to={event.path}>
                    <MoveRight
                      size={22}
                      color="#333333"
                      className="p-1 rounded-full border border-[#333333]  transition"
                    />
                  </Link>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <div className="flex items-center gap-x-2">
                    <CalendarDaysIcon size={16} color="#333333" />
                    <p className="text-[14px] sm:text-base font-semibold text-[#333333]">
                      {event.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <TimerIcon size={16} color="#333333" />
                    <p className="text-[14px] sm:text-base font-normal text-[#333333]">
                      {event.time}
                    </p>
                  </div>
                </div>
                {event.id < 4 && (
                  <hr className="w-full border-[#333333] mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default New2;
