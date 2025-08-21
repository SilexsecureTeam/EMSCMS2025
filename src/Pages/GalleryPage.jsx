import React from "react";
import Header2 from "../components/Header2";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";
import Gallery from "../components/Gallery";

const GalleryPage = () => {
  return (
    <div className=" mx-auto max-w-[1500px] ">
      <Header2 />
      <Gallery />
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default GalleryPage;
