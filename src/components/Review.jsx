import React, { useState, useEffect } from "react";
import st1 from "../assets/st1.jpg";
// import st2 from "../assets/st2.jpg";
import st3 from "../assets/st3.jpg";
import st4 from "../assets/st4.jpg";
import st5 from "../assets/st5.jpg";
import st6 from "../assets/st6.jpg";
import st7 from "../assets/st7.jpg";

const reviews = [
  {
    id: 1,
    name: "PRAISE APEH",
    title: "",
    rating: 4.8,
    avatar: st6,
    text: "As a student, my experience at the Etiquette and Management School has been truly enriching. Their knowledgeable and patient instructors make formal topics relatable, boosting confidence in communication and presentation. I highly recommend the school to any student looking to develop proper etiquette and professional skills in a respectful, encouraging atmosphere.",
  },
  {
    id: 2,
    name: "JOY AWO",
    title: "",
    rating: 4.7,
    avatar: st4,
    text: "My experience as a trainee at the school has been enriching and eye-opening. The training sessions are well-structured, practical, and professionally delivered. I’ve gained valuable knowledge on service excellence, etiquette, and personal presentation.",
  },
  {
    id: 3,
    name: "EMMANUEL ATESHE",
    title: "",
    rating: 5,
    avatar: st3,
    text: "My experience at EMS so far has been nothing short of excellent. The school is set up like a typical household, a neat and well-organised environment, as well as the genuine care and attention provided to students is carried along during lessons. I’m really happy to be part of it.",
  },
  {
    id: 4,
    name: "TIZA AONDOUNGWA",
    title: "",
    rating: 4.9,
    avatar: st7,
    text: "As a current EMS Trainee, I'm thrilled with the superb program quality, supportive peers, and ideal learning environment. Knowledgeable, passionate instructors break down complex etiquette into actionable steps, boosting my confidence through invaluable practical application and feedback.",
  },
  {
    id: 5,
    name: "ABDULLAHI SADIQ",
    title: "",
    rating: 4.6,
    avatar: st1,
    text: "My time at EMS has been very educational. The quiet, peaceful, and homely environment is perfect for learning. The welcoming, patient staff and instructors ensure we're carried along, encouraging questions. I'm truly pleased with the experience.",
  },
  {
    id: 6,
    name: "MERIEM",
    title: "",
    rating: 5,
    avatar: st5,
    text: "My experience taught me effective communication, understanding others, respecting employers, and cooperative teamwork for household services. I also learned about confidentiality and gained new friends and colleagues.",
  },
];

const REVIEWS_PER_SLIDE_LG = 2;
const REVIEWS_PER_SLIDE_SM = 1;

const getSlides = (perSlide, reviews) => {
  const slides = [];
  for (let i = 0; i < reviews.length; i += perSlide) {
    slides.push(reviews.slice(i, i + perSlide));
  }
  return slides;
};

const Review = ({ reviews: propReviews }) => {
  const [slide, setSlide] = useState(0);
  const [perSlide, setPerSlide] = useState(
    window.innerWidth >= 1024 ? REVIEWS_PER_SLIDE_LG : REVIEWS_PER_SLIDE_SM
  );

  // Use props if provided, otherwise fallback to default data
  const finalReviews = propReviews || reviews;

  const slides = getSlides(perSlide, finalReviews);

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
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

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
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full mr-3"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="w-full">
                        <div className="font-semibold md:text-2xl text-base inter">
                          {review.name}
                        </div>
                        <div className="flex w-full justify-between items-center">
                          <div className="md:text-xl text-sm font-normal text-[#1C1C1C99] inter">
                            {review.title}
                          </div>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} filled={i < review.rating} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[#1C1C1C] md:text-base text-xs inter font-normal">
                      {review.text}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Dots */}
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
