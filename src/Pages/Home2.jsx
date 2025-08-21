import React, { useEffect, useState } from "react";
import Header2 from "../components/Header2";
import Hero2 from "../components/Hero2";
import Misson2 from "../components/Mission2";
import Management2 from "../components/Management2";
import Program2 from "../components/Program2";
import Student2 from "../components/Student2";
import New2 from "../components/New2";
import Follow2 from "../components/Follow2";
import Review from "../components/Review";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";
import PageManagement from "../hooks/management";
import toast from "react-hot-toast";

const Home2 = () => {

  const { getPages } = PageManagement();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        setLoading(true);
        const response = await getPages("home");
        const data = Array.isArray(response)
          ? response[0]
          : response.data && Array.isArray(response.data)
            ? response.data[0]
            : response.data
              ? response.data
              : null;

        if (data) {
          setPageData(data);
        } else {
          toast.error("Home page data not found.");
        }
      } catch (error) {
        console.error("Failed to fetch home page:", error);
        toast.error(error.response?.data?.message || "Failed to load home page");
      } finally {
        setLoading(false);
      }
    };

    fetchHomePage();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pageData) {
    return <div>Error: Could not load page content.</div>;
  }

  return (
    <div className="bg-gray-100 mx-auto max-w-[1500px] home-2">
      <Header2 />
      <div className="lg:px-15 md:px-10 px-5">
        <Hero2 sliders={pageData.sliders} header={pageData.header_title} description={pageData.header_description} />
      </div>
     <Misson2 data={{ title: pageData.title_2, content: pageData.content_2, image: pageData.content_2_image }} />
      <Management2 />
      <Program2 data={{ title: pageData.title_3, content: pageData.content_3, image: pageData.content_3_image }} />
      <Student2 data={{ title: pageData.title_4, content: pageData.content_4, image: pageData.content_4_image }} />
      <New2 />
      <Follow2 />
      <Review />
      <Contact2 email={pageData.footer_contact} />
      <Footer2 data={{description: pageData.footer_description, greenTitle: pageData.footer_green_title ,greenDescription: pageData.footer_green_description}}  />
    </div>
  );
};

export default Home2;
