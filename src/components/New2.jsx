import React, { useState, useEffect, memo } from "react";
import {
  CalendarDaysIcon,
  ChevronRightIcon,
  MoveRight,
  TimerIcon,
} from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import PageManagement from "../hooks/management"; 
import { Toaster, toast } from "react-hot-toast"; 

const New2 = memo(() => {
  const { getPages } = PageManagement()
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCleanData = (key) => (pageData && pageData[key] && pageData[key] !== "None") ? pageData[key] : null;
  const getCleanImage = (key) => (pageData && pageData[key] && pageData[key] !== "No image" && typeof pageData[key] === 'string') ? pageData[key] : null;

  useEffect(() => {
    const fetchNewsPageData = async () => {
      try {
        setLoading(true);
        const response = await getPages("news");
        console.log("Fetched news page data for New2:", response);

        let data = null;
        if (Array.isArray(response)) {
          data = response[0];
        } else if (response && Array.isArray(response.data)) {
          data = response.data[0];
        } else if (response && response.data) {
          data = response.data;
        }

        if (data) {
          setPageData(data);
        } else {
          toast.error("News page data not found for events.");
        }
      } catch (error) {
        console.error("Failed to fetch news page data for New2:", error);
        toast.error(error.response?.data?.message || "Failed to load news & events.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsPageData();
  }, []); 

  const upcomingEvents = React.useMemo(() => {
    const events = [];

    const title2 = getCleanData('title_2');
    const content2 = getCleanData('content_2');
    const image1 = getCleanImage('content_1_image'); 

    if (title2) {
      events.push({
        id: 2,
        title: title2,
        description: "", 
        date: content2 || "Date not available",
        time: "",
        path: "/news", 
      });
    }

    const title3 = getCleanData('title_3');
    const content3 = getCleanData('content_3');
    const image3 = getCleanImage('content_3_image');

    if (title3) {
      events.push({
        id: 3,
        title: title3,
        description: "", 
        date: content3 || "Date not available",
        time: "", 
        path: "/news", 
      });
    }

    const title1 = getCleanData('title_1');
    const content1 = getCleanData('content_1');
    const image1forTitle1 = getCleanImage('content_1_image'); 
    if (title1) {
    }
    return events;
  }, [pageData]); 

  const mainArticleImageSrc = getCleanImage('content_1_image'); 
  const mainArticleTitle = getCleanData('header_title') || "How to make your etiquette training application stand out"; // Fallback title
  const mainArticleDate = "Mar 17, 2025"; 

  return (
    <div className="py-8 lg:px-15 md:px-10 px-5 home-2 bg-gray-100">
      <Toaster /> 
      <div className="w-full mx-auto">
        <h1 className="font-semibold mb-4 text-[#333333] text-center sm:text-start text-2xl md:text-[35px]">
          News & Events
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full relative rounded-lg overflow-hidden">
            {loading || !mainArticleImageSrc ? ( 
              <Skeleton variant="rectangular" width="100%" height={400} />
            ) : (
              <img
                src={mainArticleImageSrc}
                alt={mainArticleTitle}
                className="w-full h-64 sm:h-80 md:h-full object-cover"
                loading="lazy"
                decode="async"
              />
            )}
            <div className="absolute w-full h-full right-0 bottom-0 inset-0 bg-black/50"></div>
            <div className="absolute md:bottom-5 md:left-5 bottom-2 left-2 bg-[#CFBDA2] p-4 sm:p-6">
              <p className="max-w-[429px] mb-2 font-semibold text-[18px] sm:text-[22px] md:text-[24px] text-[#333333]">
                {mainArticleTitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button className="rounded-md bg-[#19392c] text-[14px] font-semibold text-white px-3 py-1.5 hover:bg-[#2a503e] transition">
                  Management
                </button>
                <div className="flex items-center gap-x-2">
                  <CalendarDaysIcon size={16} color="#333333" />
                  <p className="text-[14px] sm:text-base font-semibold text-[#333333]">
                    {mainArticleDate}
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

            {loading ? ( 
              <div>
                <Skeleton variant="text" width="80%" height={40} className="mb-4" />
                <Skeleton variant="text" width="90%" height={40} className="mb-4" />
              </div>
            ) : upcomingEvents.length === 0 ? (
              <p className="text-gray-600">No upcoming events found.</p>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="w-full mb-6">
                  <div className="flex justify-between mb-2 items-center">
                    <h2 className="mb-2 text-[#333333] capitalize font-semibold text-[18px] sm:text-[20px] md:text-[22px]">
                      {event.title}
                    </h2>
                    <Link to={event.path}>
                      <MoveRight
                        size={22}
                        color="#333333"
                        className="p-1 rounded-full border border-[#333333] transition"
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
                  {event.id < (upcomingEvents.length > 0 ? upcomingEvents[upcomingEvents.length - 1].id : 0) && ( 
                    <hr className="w-full border-[#333333] mt-4" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default New2;
