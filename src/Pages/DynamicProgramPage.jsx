import Skeleton from "@mui/material/Skeleton";
import React, { useState, useEffect } from "react";
import { CheckCircle, ArrowRight, BanknoteIcon } from "lucide-react";
import Header2 from "../components/Header2";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";
import { NavLink, useParams } from "react-router-dom";
import st1 from "../assets/st1.jpg";
import st3 from "../assets/st3.jpg";
import st4 from "../assets/st4.jpg";
import st5 from "../assets/st5.jpg";
import st6 from "../assets/st6.jpg";
import st7 from "../assets/st7.jpg";
import PageManagement from "../hooks/management";

// Hardcoded reviews (unchanged)
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

// Star SVG component for reusability, modified to handle partial filling
const Star = ({ filled, percentage = 1 }) => {
  const fillId = `star-gradient-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <svg
      className={`w-5 h-5 ${filled ? "text-[#FD8E1F]" : "text-[#FFF2E5]"}`}
      viewBox="0 0 20 20"
    >
      {percentage < 1 && percentage > 0 ? (
        <>
          <defs>
            <linearGradient id={fillId}>
              <stop offset={`${percentage * 100}%`} stopColor="#FD8E1F" />
              <stop offset={`${percentage * 100}%`} stopColor="#FFF2E5" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#${fillId})`}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
          />
        </>
      ) : (
        <path
          fill="currentColor"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
        />
      )}
    </svg>
  );
};

// Rating breakdown data (unchanged)
const ratingData = [
  { stars: 5, percent: 75 },
  { stars: 4, percent: 21 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 0.5 },
];

const REVIEWS_PER_SLIDE_LG = 2;
const REVIEWS_PER_SLIDE_SM = 1;

const getSlides = (perSlide) => {
  const slides = [];
  for (let i = 0; i < reviews.length; i += perSlide) {
    slides.push(reviews.slice(i, i + perSlide));
  }
  return slides;
};

const IMG_URL = import.meta.env.VITE_IMAGE_URL;

const DynamicProgramPage = () => {
  const { slug } = useParams();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [programData, setProgramData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getProgramById } = PageManagement();

  // Normalize array fields
  const normalizeArrayField = (field) => {
    if (Array.isArray(field)) return field;
    if (field && typeof field === "object") return Object.values(field);
    if (typeof field === "string") return field.split(",").map((item) => item.trim());
    return [];
  };

  // Format course fee
  const formatCourseFee = (fee) => {
    if (!fee) return "₦0";
    const numericFee = parseFloat(fee.replace(/[^0-9.-]+/g, ""));
    return `₦${numericFee.toLocaleString()}`;
  };

  // Preload hero image if available
  useEffect(() => {
    if (programData?.image) {
      const img = new Image();
      img.src = `${IMG_URL}${programData.image}`;
      img.onload = () => setHeroLoaded(true);
    } else {
      setHeroLoaded(true); // No image, so skip loading state
    }
  }, []);

  // Fetch program data by slug
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        const response = await getProgramById(slug);
        console.log("Fetched program:", response);
        const program = response?.data; // Access the 'data' field from response
        if (program) {
          // Normalize array fields
          setProgramData({
            ...program,
            learning_outcomes: normalizeArrayField(program.learning_outcomes),
            curriculum: normalizeArrayField(program.curriculum),
            entry_requirement: normalizeArrayField(program.entry_requirement),
            course_content: normalizeArrayField(program.course_content),
            learning_experience: normalizeArrayField(program.learning_experience),
            target_audience: program.target_audience || "",
            reviews: normalizeArrayField(program.reviews),
          });
        } else {
          setProgramData(null);
        }
      } catch (error) {
        console.error("Error fetching program:", error);
        setProgramData(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchProgram();
    } else {
      setLoading(false);
      setProgramData(null);
    }
  }, [slug]);

  const tabs = ["overview", "curriculum", "entry-requirements", "review"];
  const [activeTab, setActiveTab] = useState("overview");
  const [openIndex, setOpenIndex] = useState(null);
  const [slide, setSlide] = useState(0);

  // Responsive logic: use window width to determine reviews per slide
  const [perSlide, setPerSlide] = useState(
    window.innerWidth >= 1024 ? REVIEWS_PER_SLIDE_LG : REVIEWS_PER_SLIDE_SM
  );

  React.useEffect(() => {
    const handleResize = () => {
      setPerSlide(
        window.innerWidth >= 1024 ? REVIEWS_PER_SLIDE_LG : REVIEWS_PER_SLIDE_SM
      );
      setSlide(0); // Reset to first slide when layout changes
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = getSlides(perSlide);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="max-w-[1500px] mx-auto">
        <Header2 />
        <Skeleton variant="rectangular" width="100%" height="70vh" />
      </div>
    );
  }

  if (!programData) {
    return (
      <div className="max-w-[1500px] mx-auto">
        <Header2 />
        <div className="lg:px-15 md:px-10 px-5 p inter pb-30 inter justify-between bg-white w-full">
          <p className="text-[#333333] text-base inter">Program not found.</p>
        </div>
        <Contact2 />
        <Footer2 />
      </div>
    );
  }

  // Fallback data
  const fallbackData = {
    title: "House Keeper Training Course",
    content: "A professional housekeeper is the foundation of a well-managed home. This course prepares participants to uphold international housekeeping standards, tailored to the cultural and practical realities of Nigerian homes, especially in high-net-worth and professional households. Whether you’re entering the profession or enhancing your skills, this course provides everything needed to become a confident, capable, and trusted housekeeper.",
    description: "Have you ever stepped into a home where: Every surface gleams, every item is in its place; The household runs with quiet, effortless efficiency; Staff are discreet, competent, and culturally aware.",
    learning_outcomes: [
      "Execute professional housekeeping routines with efficiency and care",
      "Maintain household appliances and equipment safely and correctly",
      "Navigate household dynamics with cultural competence and discretion",
      "Respond appropriately in emergencies and ensure safety in the home",
    ],
    course_fee: "₦550,000",
    target_audience: "Individuals currently working as housekeepers, Anyone interested in becoming a professional housekeeper, Domestic staff seeking to work in luxury or high-standard homes",
    entry_requirement: [
      "Basic English proficiency",
      "Willingness to learn and take initiative",
      "A keen eye for detail and personal discipline",
    ],
    curriculum: [
      "Introduction to Professional Housekeeping",
      "Laundry, Fabric Care, and Household Organisation",
      "Household Maintenance and Light Cooking",
      "Safety, Emergency Preparedness, and Client Relations",
    ],
    course_content: [
      "2-week intensive training",
      "Comprehensive study materials",
      "Interactive training sessions",
      "Final certification upon completion",
    ],
    learning_experience: [
      "Live Demonstrations",
      "Interactive Role-Playing",
      "Video Lessons",
      "Hands-on Appliance Training",
      "Worksheets and Practical Exercises",
    ],
    reviews: [],
  };

  // Process target_audience (convert string to array if needed)
  const targetAudienceArray = programData.target_audience
    ? programData.target_audience.split(",").map((item) => item.trim())
    : fallbackData.target_audience.split(",").map((item) => item.trim());

  // Use API reviews if available, otherwise fallback to hardcoded reviews
  const displayReviews = programData.reviews.length > 0 ? programData.reviews : reviews;

  return (
    <div className="max-w-[1500px] mx-auto">
      <Header2 />
      <div className="lg:px-15 md:px-10 px-5 p inter pb-30 inter justify-between bg-white w-full">
        <div className="w-full md:h-[70vh] h-[50vh]">
          {!heroLoaded && (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          )}
          <img
            src={`${programData.image }`}
            alt={programData.title || "Program Image"}
            className={`w-full h-full object-cover ${heroLoaded ? "block" : "hidden"}`}
            onLoad={() => setHeroLoaded(true)}
            loading="eager"
            decoding="async"
          />
        </div>
        {/* Tabs Navigation */}
        <nav className="border-b pt-10 border-gray-200 mb-8">
          <ul className="flex flex-wrap w-full justify-between gap-3">
            {tabs.map((tab) => (
              <li key={tab}>
                <button
                  className={`pb-2 lg:px-15 md:px-18 px-3 w-fit inter md:text-2xl text-[19px] font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-black bg-white text-[#1D2026]"
                      : "text-[#4E5566]"
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    const el = document.getElementById(tab);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/-/g, " ")}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:px-15 md:px-18 px-3">
          <div className="md:flex md:space-x-5" id="overview">
            {/* Main Content */}
            <div className="flex-1 space-y-6 lg:w-1/2">
              <h1 className="text-2xl text-[#1D2026] font-semibold">
                {programData.title || fallbackData.title}
              </h1>
              <p className="text-[#333333] font-normal text-base md:text-xl">
               {(programData.description || fallbackData.description)
                  .split(";")
                  .map((item) => item.trim())
                  .filter((item) => item)
                  .map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </p>
              

              <section className="space-y-4 mt-6">
                <h2 className="text-2xl text-[#1D2026] inter font-semibold">
                  Description
                </h2>
                <p className="text-[#333333] text-[12px] md:text-base inter leading-relaxed">
                  {programData.content || fallbackData.content}
                </p>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/2 flex justify-center inter md:justify-end">
              <aside className="mt-12 lg:mt-0 lg:w-80 bg-[#c5ac8e] inter h-fit text-white p-6 rounded-lg">
                <h3 className="font-semibold inter mb-4">This Course Includes:</h3>
                <ul className="list-disc list-inside inter space-y-2 mb-6 text-sm">
                  {(Array.isArray(programData.course_content)
                    ? programData.course_content
                    : fallbackData.course_content
                  ).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <div>
                  <div className="flex justify-between">
                    <p className="inter font-semibold">Application fee:</p>
                    <p className="inter font-semibold w-[91px]">₦50,000</p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <p className="inter font-semibold">Course fee:</p>
                    <p className="inter font-semibold w-[91px]">
                      {formatCourseFee(programData.course_fee || fallbackData.course_fee)}
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center w-full space-x-2">
                      <div className="flex items-center">
                        <BanknoteIcon />
                        <span className="text-lg font-bold inter">Total price:</span>
                      </div>
                      <p className="text-lg font-bold inter w-[91px]">
                        ₦{(
                          parseFloat(
                            (programData.course_fee || fallbackData.course_fee).replace(
                              /[^0-9.-]+/g,
                              ""
                            )
                          ) + 50000
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <NavLink to="/enroll">
                  <button className="w-full bg-[#19392c] py-2 rounded-md flex items-center justify-center font-medium hover:bg-green-800">
                    <span>Enrol Now</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </NavLink>
              </aside>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="bg-[#E1F7E366] px-8 py-10 my-10">
            <h2 className="text-2xl text-[#333333] font-semibold mb-4">
              Learning Outcomes in this course
            </h2>
            <h2 className="text-base md:text-xl text-[#333333] mb-6">
              By the end of the training, participants will be able to:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(Array.isArray(programData.learning_outcomes)
                ? programData.learning_outcomes
                : fallbackData.learning_outcomes
              ).map((outcome, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <p className="text-[#4E5566] inter md:text-base text-sm max-w-[475px]">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum & Audience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="curriculum">
            <div>
              <h2 className="md:text-2xl text-xl inter font-semibold text-[#333333] mb-4">
                Curriculum
              </h2>
              <div className="border border-[#E9EAF0] rounded-lg">
                {(Array.isArray(programData.curriculum)
                  ? programData.curriculum
                  : fallbackData.curriculum
                ).map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-b-[#E9EAF0] px-4 py-3 cursor-pointer"
                    onClick={() => toggleIndex(index)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inter md:text-base text-sm text-[#333333]">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who is this for */}
            <div>
              <h2 className="md:text-2xl text-xl inter font-semibold text-[#333333] mb-4">
                Who is this course for?
              </h2>
              <div className="space-y-4 border border-[#E9EAF0] rounded-lg">
                {targetAudienceArray.map((audience, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm border-b border-b-[#E9EAF0] pb-2"
                  >
                    <ArrowRight className="mt-1 w-4 h-4 text-gray-600" />
                    <span className="inter md:text-base text-sm text-[#333333]">
                      {audience}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </div>

          {/* Entry Requirements */}
          <section className="space-y-2 mb-10" id="entry-requirements">
            <div>
              <h2 className="text-2xl inter font-semibold text-gray-900 mb-5">
                Entry Requirements
              </h2>
              <ul className="list-disc list-inside text-[#4E5566] text-sm md:text-base inter space-y-1">
                {(Array.isArray(programData.entry_requirement)
                  ? programData.entry_requirement
                  : fallbackData.entry_requirement
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Learning Experience */}
          <section className="mb-10">
            <div>
              <h2 className="text-2xl inter font-semibold text-gray-900 mb-4">
                Learning Experience
              </h2>
              <p className="text-sm md:base inter font-medium text-[#1D2026] mb-4">
                All training is conducted on-site and includes:
              </p>
              <ul className="list-disc list-inside text-[#4E5566] text-sm md:text-base inter space-y-1">
                {(Array.isArray(programData.learning_experience)
                  ? programData.learning_experience
                  : fallbackData.learning_experience
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Course Rating Section */}
          <div>
            <h2 className="text-2xl inter font-semibold text-gray-900 mb-4">
              Course Rating
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
              <div className="flex flex-col items-center bg-white p-8 shadow">
                <span className="text-5xl font-bold">4.8</span>
                <div className="flex items-center my-4">
                  {[...Array(5)].map((_, i) => {
                    const rating = 4.8;
                    return (
                      <Star
                        key={i}
                        filled={i < 4}
                        percentage={i === 4 ? rating - 4 : 1}
                      />
                    );
                  })}
                </div>
                <span className="text-gray-500 text-sm">Course Rating</span>
              </div>
              <div className="flex-1 w-full">
                {ratingData.map((item) => (
                  <div key={item.stars} className="flex items-center mb-2">
                    <div className="flex items-center w-fit">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          filled={i < item.stars}
                          className="bg-[#FD8E1F] w-10 h-10"
                        />
                      ))}
                      <span className="ml-2 text-gray-600 inter text-base">
                        {item.stars} Star Rating
                      </span>
                    </div>
                    <div className="flex-1 mx-4 bg-[#FFF2E5] rounded h-2">
                      <div
                        className="bg-[#FD8E1F] h-2 rounded"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                    <span className="w-10 text-right text-gray-600 text-xs">
                      {item.percent >= 1 ? `${item.percent}%` : "<1%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Slider */}
          <h2 className="text-2xl inter font-semibold text-gray-900 mb-5" id="review">
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
                    className="flex gap-6 w-full shrink-0"
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
                                  <Star
                                    key={i}
                                    filled={i < review.rating}
                                    className="bg-[#FD8E1F]"
                                  />
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
                    ${slide === idx ? "bg-[#193728] border-[#193728]" : "bg-gray-300 border-gray-300"}`}
                  onClick={() => setSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default DynamicProgramPage;