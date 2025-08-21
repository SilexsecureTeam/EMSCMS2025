import React from "react";
import { CalendarDaysIcon } from "lucide-react";
import one from "../assets/phero3.png";
import two from "../assets/nanny.png";
import three from "../assets/header4.png";
import { Link } from "react-router-dom";

const allNews = [
  {
    id: 1,
    title: "3-month Graduate training",
    date: "30th June - 30th September",
    image: one,
    path: "/programs",
  },
  {
    id: 2,
    title: "2-week Foreign nanny training",
    date: "7th July - 18th July",
    image: two,
    path: "/nanny-training",
  },
  {
    id: 3,
    title: "2-week housekeeper training",
    date: "7th July - 18th July",
    image: three,
    path: "/house-keeper",
  },
];

const AllNews = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 md:px-12 lg:px-24 bg-gray-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#19392c] tracking-tight">
            All News & Articles
          </h1>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allNews.map((news, index) => (
          <div
            key={news.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
          >
            <Link to={news.path}>
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
              />
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
        ))}
      </div>

      {/* CSS Animation for Fade-In Effect */}
      <style jsx>{`
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
