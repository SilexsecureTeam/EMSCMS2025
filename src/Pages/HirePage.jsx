import React from "react";
import Header2 from "../components/Header2";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";
import HireForm from "../components/HireForm";
import Hire from "../components/Hire";
// import MultiStepForm from "../components/MultiStepForm";

const HirePage = () => {
  return (
    <div className="bg-gray-100 mx-auto max-w-[1500px] ">
      <Header2 />
      {/* <MultiStepForm /> */}
      <Hire />
      <HireForm />
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default HirePage;
