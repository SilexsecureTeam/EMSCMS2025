import React, { useEffect, useState } from "react";
import Header2 from "../components/Header2";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";
import AllNews from "../components/AllNews";
import PageManagement from "../hooks/management";
import toast from "react-hot-toast"; 

const NewsPage = () => {
  const { getPages } = PageManagement();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsPage = async () => { 
      try {
        setLoading(true);
        const response = await getPages("news");
        console.log('Fetched news page response:', response);

        let data = null;
        // Logic to safely extract data from various response formats
        if (Array.isArray(response)) {
          data = response[0];
        } else if (response && Array.isArray(response.data)) {
          data = response.data[0];
        } else if (response && response.data) {
          data = response.data;
        }

        if (data) {
          setPageData(data);
        } else {
          toast.error("News page data not found.");
        }
      } catch (error) {
        console.error("Failed to fetch news page:", error);
        toast.error(error.response?.data?.message || "Failed to load news page");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsPage();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading News...
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium text-red-600">
        Error: Could not load page content.
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto">
      <Header2 />
      <AllNews pageData={pageData} />
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default NewsPage;
