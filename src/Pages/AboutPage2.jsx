import { useEffect, useState } from "react";
import Header2 from "../components/Header2";
import About from "../components/About";
import Aabout from "../components/Aabout";
import OurValues from "../components/OurValues";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";
import PageManagement from "../hooks/management";

const AboutPage2 = () => {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  const { getPages } = PageManagement();

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        setLoading(true);
        const response = await getPages("about");
        console.log(response)
        const data = Array.isArray(response) ? response[0] : response.data && Array.isArray(response.data) ? response.data[0] : response.data ? response.data : null;

        if (data) {
          setPageData(data);
        } else {
          console.error("About page data not found.");
        }
      } catch (error) {
        console.error("Failed to fetch about page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pageData) {
    return <div>Error: Could not load page content.</div>;
  }

  return (
    <div className="max-w-[1500px] mx-auto">
      <Header2 />
      <div className="lg:px-15 md:px-10 px-5 p">
        <About data={{
          title1: pageData.title_1,
          content1: pageData.content_1,
          image1: pageData.sliders
        }} />
        <div className="py-10 p">
          <Aabout data={{
            title1: pageData.title_2,
            content1: pageData.content_2,
            image1: pageData.content_2_image,
            title2 : pageData.title_2,
            content2 : pageData.content_3,
            image2:pageData.content_3_image,
            title3 : pageData.title_3,
            content3 : pageData.content_3,
            image3:pageData.content_3_image,
          }} />
        </div>
        <OurValues data={{
            title4:pageData.title_4,
            content4:pageData.content_4,
            image4:pageData.content_4_image
        }} />
      </div>
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default AboutPage2;