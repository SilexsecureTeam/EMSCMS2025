import React from "react";
import Header2 from "../components/Header2";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";
import AllNews from "../components/AllNews";

const NewsPage = () => {
  return (
    <div className="max-w-[1500px] mx-auto">
      <Header2 />
      <AllNews />
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default NewsPage;
