import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blog from "../assets/blog.png";
import Header2 from "../components/Header2";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";
import { Skeleton } from "@mui/material";
import PageManagement from "../hooks/management";
import { toast } from "react-hot-toast";

const BlogPage = () => {
  const IMG_URL = import.meta.env.VITE_IMAGE_URL;
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});
  const { getAllBlogs } = PageManagement();

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const [categories, setCategories] = useState([]);
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getAllBlogs();
        console.log("Fetched blogs:", data);

        if (data && Array.isArray(data)) {
          // All blogs
          setCategories(data);

          const filteredTopStories = data.filter(
            (blog) => blog.top_stories === 1
          );
          setTopStories(filteredTopStories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-[1500px] mx-auto">
      <Header2 />
      <div className="lg:px-15 md:px-10 px-5 md:pb-12">
        {/* Banner */}
        <div className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden">
          {!bannerLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
            />
          )}
          <img
            src={blog}
            alt="Descriptive alt text for accessibility"
            className="w-full h-full object-cover object-center"
            onLoad={() => setBannerLoaded(true)}
            loading="eager"
            decoding="async"
            style={{ display: bannerLoaded ? "block" : "none" }}
          />
        </div>

        <div className="flex w-full flex-col md:flex-row">
          {/* Main Blog Grid */}
          <section className="px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl poppins font-bold text-[#333333]">
                Welcome to Our Blog
              </h2>
              <p className="mt-2 poppins max-w-[430px] text-[#333333]">
                Stay inspired with expert tips on personal grooming, cultural
                etiquette, and professional excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading
                ? [...Array(6)].map((_, idx) => (
                    <Skeleton
                      key={idx}
                      variant="rectangular"
                      height={300}
                      animation="wave"
                    />
                  ))
                : categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="bg-white rounded-lg rounded-t-2xl overflow-hidden flex flex-col hover:shadow-lg hover:scale-105 transition duration-300"
                    >
                      {!imageLoaded[cat.id] && (
                        <Skeleton
                          variant="rectangular"
                          className="w-full h-48"
                          animation="wave"
                        />
                      )}
                      <img
                        src={`${IMG_URL}${cat.image}`}
                        alt={cat.title}
                        className="w-full h-48 object-cover"
                        onLoad={() => handleImageLoad(cat.id)}
                        style={{
                          display: imageLoaded[cat.id] ? "block" : "none",
                        }}
                      />
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-[20px] font-semibold poppins text-[#2E2F33] mb-2">
                          {cat.title}
                        </h3>
                        <p className="text-[#5F6980] poppins text-sm mb-4 flex-grow">
                          {cat.content.length > 20
                            ? `${cat.content.slice(0, 20)}...`
                            : cat.content}
                        </p>
                        <div className="flex items-center justify-between text-gray-500 text-xs">
                          <Link
                            to={`/posts/${cat.slug}`}
                            className="text-blue-500 font-semibold hover:underline"
                          >
                            View More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </section>

          {/* Top Stories Aside */}
          <aside className="max-w-xs w-full px-4 py-12 md:border-l md:border-gray-200 md:pl-8 space-y-8">
            <h2 className="text-lg poppins font-bold text-[#333333] mb-6">
              Top Stories
            </h2>
            <div className="space-y-8">
              {loading
                ? [...Array(3)].map((_, idx) => (
                    <Skeleton
                      key={idx}
                      variant="rectangular"
                      height={150}
                      animation="wave"
                    />
                  ))
                : topStories.slice(0, 4).map((story, idx) => (
                    <div
                      key={story.id}
                      className={`space-y-3 ${
                        idx < topStories.slice(0, 4).length - 1
                          ? "border-b border-gray-200 pb-8"
                          : ""
                      }`}
                    >
                      <div className="text-2xl font-bold text-gray-900">
                        {idx + 1}
                      </div>
                      <div className="bg-white rounded-lg rounded-t-2xl overflow-hidden shadow hover:shadow-lg hover:scale-105 transition duration-300">
                        {!imageLoaded[story.id] && (
                          <Skeleton
                            variant="rectangular"
                            className="w-full h-32"
                            animation="wave"
                          />
                        )}
                        <img
                          src={`${IMG_URL}${story.image}`}
                          alt={story.title}
                          className="w-full h-32 object-cover"
                          onLoad={() => handleImageLoad(story.id)}
                          style={{
                            display: imageLoaded[story.id] ? "block" : "none",
                          }}
                        />
                        <div className="p-3 flex flex-col">
                          <h3 className="text-base font-semibold poppins text-[#2E2F33] mb-2">
                            {story.title}
                          </h3>
                          <p className="text-[#5F6980] poppins text-sm mb-4 flex-grow">
                            {story.content.length > 20
                              ? `${story.content.slice(0, 20)}...`
                              : story.content}
                          </p>
                          <div className="flex items-center justify-between text-gray-500 text-xs">
                            <Link
                              to={`/posts/${story.slug}`}
                              className="text-blue-500 font-semibold hover:underline"
                            >
                              View More
                            </Link>
                            {story.date && (
                              <span className="text-[#333333] opacity-50 poppins">
                                {story.date}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </aside>
        </div>
      </div>
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default BlogPage;