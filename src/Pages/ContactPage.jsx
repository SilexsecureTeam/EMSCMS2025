import React from "react";
import Contact from "../components/Contact";
import Header2 from "../components/Header2";
import Footer2 from "../components/Footer2";
import Contact2 from "../components/Contact2";

const ContactPage = () => {
  return (
    <div className="max-w-[1500px] mx-auto">
      <Header2 />
      <Contact />
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default ContactPage;
