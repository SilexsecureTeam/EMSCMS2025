import React, { useState, useEffect, memo } from "react";
import { MoveUpIcon } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import PageManagement from "../hooks/management";

const Student2 = memo(() => {
  const { getPageBlock } = PageManagement();
  const [block, setBlock] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        const response = await getPageBlock();
        console.log("Page block response:", response);
        let data;
        if (Array.isArray(response)) {
          data = response[0];
        } else if (response?.data && Array.isArray(response.data)) {
          data = response.data[0];
        } else if (response?.data && typeof response.data === "object") {
          data = response.data;
        }
        setBlock(data);
      } catch (error) {
        console.error("Failed to fetch page block:", error);
        setBlock(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlock();
  }, []);

  useEffect(() => {
    if (block?.image) {
      const img = new Image();
      img.src = block.image.startsWith("http")
        ? block.image
        : `${import.meta.env.VITE_IMAGE_URL}${block.image}`;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false);
    } else {
      setImageLoaded(false);
    }
  }, [block]);

  if (loading) {
    return (
      <div className="md:p-10 md:py-10 py-4 lg:px-15 md:px-10 px-5 home-2">
        <Skeleton variant="text" width="60%" height={50} className="mx-auto mb-4" />
        <Skeleton variant="text" width="80%" height={25} className="mx-auto mb-3" />
        <Skeleton variant="rectangular" width="100%" height={600} />
      </div>
    );
  }

  if (!block) {
    return (
      <div className="md:p-10 md:py-10 py-4 lg:px-15 md:px-10 px-5 home-2">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-500">No page block found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="md:p-10 md:py-10 py-4 lg:px-15 md:px-10 px-5 home-2">
      <h1 className="font-bold text-[#333333] mx-auto block md:max-w-[675px] mb-4 w-full text-center text-2xl capitalize lg:text-[35px]" style={{lineHeight: 1.2}}>
        {block.header}
      </h1>
      <p className="text-[17px] mx-auto block text-center md:max-w-[675px] w-full mb-3 font-light text-[#555]">
        {block.sub_heading || ""}
      </p>

      <div className="relative w-full gap-10 mt-10">
        {!imageLoaded ? (
          <Skeleton variant="rectangular" width="100%" height={600} />
        ) : (
          <img
            src={
              block.image.startsWith("http")
                ? block.image
                : `${import.meta.env.VITE_IMAGE_URL}${block.image}`
            }
            alt={block.header || "Student writing"}
            className="object-cover w-full h-[600px] rounded-sm"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="absolute w-full h-full right-0 bottom-0 inset-0 bg-black/30"></div>
        <div className="bg-white absolute right-2 bottom-2 md:bottom-16 z-30 rounded-lg shadow-md p-5 w-fit">
          <div className="flex justify-between items-center mb-3.5">
            <h2 className="font-semibold text-[#333333] text-lg md:text-xl">
              {block.title1}
            </h2>
            <Link to="/programs">
              <MoveUpIcon
                className="text-[#6C4F40] border border-[#6C4F40] rounded-full p-1 cursor-pointer hover:bg-[#6C4F40]/10 transition"
                size={24}
              />
            </Link>
          </div>
          <p className="font-normal max-w-[380px] text-sm md:text-[17px] text-[#333333] mb-2.5">
            {block.content1}
          </p>
          <hr className="w-full h-[1px] opacity-40 mb-5 bg-[#000000]" />
          <div className="flex justify-between items-center mb-3.5">
            <h2 className="font-semibold text-[#333333] text-lg md:text-xl">
              {block.title2}
            </h2>
            <Link to="/programs">
              <MoveUpIcon
                className="text-[#6C4F40] border border-[#6C4F40] rounded-full p-1 cursor-pointer hover:bg-[#6C4F40]/10 transition"
                size={24}
              />
            </Link>
          </div>
          <p className="font-normal max-w-[380px] text-sm md:text-[17px] text-[#333333] mb-2.5">
            {block.content2}
          </p>
          <hr className="w-full h-[1px] opacity-40 mb-5 bg-[#000000]" />
          <div className="flex justify-between items-center mb-3.5">
            <h2 className="font-semibold text-[#333333] text-lg md:text-xl">
              {block.title3}
            </h2>
            <Link to="/programs">
              <MoveUpIcon
                className="text-[#6C4F40] border border-[#6C4F40] rounded-full p-1 cursor-pointer hover:bg-[#6C4F40]/10 transition"
                size={24}
              />
            </Link>
          </div>
          <p className="font-normal max-w-[380px] text-sm md:text-[17px] text-[#333333] mb-2.5">
            {block.content3}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-10">
      </div>
    </div>
  );
});

export default Student2;