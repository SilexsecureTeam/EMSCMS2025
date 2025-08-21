import React from "react";
import Header2 from "../components/Header2";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";
import EmsForm from "../components/EmsForm";
// import MultiStepForm from "../components/MultiStepForm";

const FormPage = () => {
  return (
    <div className="bg-gray-100 mx-auto max-w-[1500px] ">
      <Header2 />
      {/* <MultiStepForm /> */}
      <EmsForm />
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default FormPage;
