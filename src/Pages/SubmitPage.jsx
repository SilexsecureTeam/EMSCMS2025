import React from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../components/Header2";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";

const SubmitPage = () => {
  const navigate = useNavigate();

  return (
     <div className="max-w-[1500px] mx-auto">
        <Header2 />
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md text-center mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-[#19392c] mb-4">
          Thank You for Your contacting us
        </h2>
        <p className="text-gray-700 mb-6">
          We have received your message and will get back to you soon.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#19392c] hover:bg-[#19392c]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#19392c]"
        >
          Back to Homepage
        </button>
      </div>
    </div>
    <Contact2 />
    <Footer2 />
    </div>
  );
};

export default SubmitPage;