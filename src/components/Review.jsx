import React, { useState, useEffect } from "react";
import PageManagement from "../hooks/management";
import st1 from "../assets/st1.jpg";

const REVIEWS_PER_SLIDE_LG = 2;
const REVIEWS_PER_SLIDE_SM = 1;

const getSlides = (perSlide, reviews) => {
  const slides = [];
  for (let i = 0; i < reviews.length; i += perSlide) {
    slides.push(reviews.slice(i, i + perSlide));
  }
  return slides;
};

const Review = () => {
  const { getReviews } = PageManagement();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  const [perSlide, setPerSlide] = useState(
    window.innerWidth >= 1024 ? REVIEWS_PER_SLIDE_LG : REVIEWS_PER_SLIDE_SM
  );
  const IMG_URL = import.meta.env.VITE_IMAGE_URL;

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getReviews();
      const reviewList = Array.isArray(response)
        ? response
        : response?.data && Array.isArray(response.data)
          ? response.data
          : [];
      // Filter only featured reviews
      const featuredReviews = reviewList.filter(r => r.featured);
      setReviews(featuredReviews);
    } catch (error) {
      console.error("Failed to load reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const slides = getSlides(perSlide, reviews);

  useEffect(() => {
    const handleResize = () => {
      setPerSlide(
        window.innerWidth >= 1024 ? REVIEWS_PER_SLIDE_LG : REVIEWS_PER_SLIDE_SM
      );
      setSlide(0); // Reset to first slide when layout changes
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [slides.length]);

  if (loading) {
    return (
      <div className="lg:px-15 md:px-10 px-5 home-2 pb-20">
        <h2 className="font-semibold md:text-[35px] text-2xl text-center text-[#333333] mb-5">
          Students Reviews
        </h2>
        <div className="bg-white p-8 shadow">
          <div className="flex justify-center items-center h-40">
            <div className="text-lg">Loading reviews...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:px-15 md:px-10 px-5 home-2 pb-20">
      {/* Reviews Slider */}
      <h2
        className="font-semibold md:text-[35px] text-2xl text-center text-[#333333] mb-5 mt-"
        id="Review"
      >
        Students Reviews
      </h2>
      <div className="bg-white p-8 shadow">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {slides.map((slideReviews, idx) => (
              <div
                key={idx}
                className={`flex gap-6 w-full shrink-0`}
                style={{ minWidth: "100%" }}
              >
                {slideReviews.map((review, ridx) => (
                  <div
                    key={ridx}
                    className="flex-1 bg-white rounded-lg p-6 shadow border border-[#3347B052] mx-2 flex flex-col"
                  >
                    <div className="flex items-center mb-3">
                      <img
                        src={
                          review.image
                            ? review.image.startsWith("http")
                              ? review.image
                              : `${IMG_URL}${review.image}`
                            : st1
                        }
                        alt={review.reviewer_name}
                        className="w-12 h-12 rounded-full mr-3 object-cover"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.src = st1; // fallback image on error
                        }}
                      />
                      <div className="w-full">
                        <div className="font-semibold md:text-2xl text-base inter">
                          {review.reviewer_name}
                        </div>
                        <div className="flex w-full justify-between items-center">
                          <div className="md:text-xl text-sm font-normal text-[#1C1C1C99] inter">
                            {review.title || ""}
                          </div>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} filled={i < Math.floor(review.rating)} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[#1C1C1C] md:text-base text-xs inter font-normal">
                      {review.review}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Dots */}
        {slides.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full cursor-pointer border-2 transition-colors
                  ${
                    slide === idx
                      ? "bg-[#193728] border-[#193728]"
                      : "bg-gray-300 border-gray-300"
                  }`}
                onClick={() => setSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Star component (kept separate for reusability)
export const Star = ({ filled, className }) => {
  return (
    <svg
      className={`w-5 h-5 ${filled ? "text-[#FD8E1F]" : "text-[#FFF2E5]"} ${
        className || ""
      }`}
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
      />
    </svg>
  );
};

export default Review;