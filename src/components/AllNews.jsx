import React from "react";
import { CalendarDaysIcon } from "lucide-react";
import { Link } from "react-router-dom";
 

const AllNews = ({ pageData }) => {
  const newsList = React.useMemo(() => {
    const items = [];

    const getCleanData = (key) => (pageData[key] && pageData[key] !== "None") ? pageData[key] : null;
    const getCleanImage = (key) => (pageData[key] && pageData[key] !== "No image" && typeof pageData[key] === 'string') ? pageData[key] : null;

    const title1 = getCleanData('title_1');
    const content1 = getCleanData('content_1');
    const image1 = getCleanImage('content_1_image');

    const title2 = getCleanData('title_2');
    const content2 = getCleanData('content_2');
    const image2 = getCleanImage('content_2_image'); 

    const title3 = getCleanData('title_3');
    const content3 = getCleanData('content_3');
    const image3 = getCleanImage('content_3_image');

    const title4 = getCleanData('title_4');
    const content4 = getCleanData('content_4');
    const image4 = getCleanImage('content_4_image');

   
    if (title1) { 
        items.push({
            id: 1,
            title: title1,
            date: content1 || "Date not available",
            image: image1, // original image for title 1
            path: `/programs`,
        });
    }


    if (title2) {
        items.push({
            id: 2,
            title: title2,
            date: content2 || "Date not available",
            image: image1 || image2, 
            path: `/programs`,
        });
    }

    // Handle Item 3
    if (title3) {
        items.push({
            id: 3,
            title: title3,
            date: content3 || "Date not available",
            image: image3,
            path: `/programs`,
        });
    }

    // Handle Item 4
    if (title4) {
        items.push({
            id: 4,
            title: title4,
            date: content4 || "Date not available",
            image: image4,
            path: `/programs`,
        });
    }

    return items;
  }, [pageData]); // Depend on pageData to re-calculate if it changes

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 md:px-12 lg:px-24 bg-gray-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#19392c] tracking-tight">
            {pageData.header_title && pageData.header_title !== "Untitled"
              ? pageData.header_title
              : "All News & Articles"}
          </h1>
        </div>
        {/* Conditionally display the Header Description if available and not "None" */}
        {pageData.header_description && pageData.header_description !== "None" && (
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            {pageData.header_description}
          </p>
        )}
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Display a message if no news articles are found */}
        {newsList.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 py-8">No news articles found.</p>
        ) : (
          // Map over the dynamically generated newsList to render each article
          newsList.map((news, index) => (
            <div
              key={news.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
            >
              <Link to={news.path}>
                {/* Conditionally render the image if a valid imageUrl exists */}
                {news.image && (
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl md:text-2xl capitalize font-semibold text-[#333333] mb-3 line-clamp-2">
                    {news.title}
                  </h2>
                  <div className="flex items-center gap-2 text-[#666666] text-sm font-medium">
                    <CalendarDaysIcon size={16} />
                    <span>{news.date}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* CSS Animation for Fade-In Effect */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AllNews;
