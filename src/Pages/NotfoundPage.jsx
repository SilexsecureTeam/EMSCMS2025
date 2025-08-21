import React from "react";
import { Link } from "react-router-dom";

const NotfoundPage = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-col w-full h-screen">
      <h2 className="text-2xl md:text-4xl text-[#4E5566] mb-3">
        page not found
      </h2>
      <Link to="/">
        <button className="bg-green-600 cursor-pointer border-0 text-white poppins text-xl md:text-2xl px-7 py-3.5 rounded-xl">
          Go back Home
        </button>
      </Link>
    </div>
  );
};

export default NotfoundPage;
