import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import herobg1 from "../assets/header4.png";
import herobg2 from "../assets/nanny.png";
import herobg3 from "../assets/header5.png";
import herobg4 from "../assets/header6.png";
import herobg5 from "../assets/sliver.jpg";
import herobg6 from "../assets/steward.jpg";
import herobg7 from "../assets/header.png";
import herobg8 from "../assets/header3.png";
import herobg9 from "../assets/luxury.jpg";
import Header2 from "../components/Header2";
import Contact2 from "../components/Contact2";
import Footer2 from "../components/Footer2";

const programs = [
  {
    id: 1,
    imageSrc: herobg1,
    alt: "Program 1 description",
    title: "House Keeper Training Course",
    summary:
      "A professional housekeeper is the foundation of a well-managed home. This course prepares participants to uphold international housekeeping standards........",
    link: "/house-keeper",
  },
  {
    id: 2,
    imageSrc: herobg2,
    alt: "Program 2 description",
    title: "Nanny Training Course",
    summary:
      "Professional nannies are more than caretakers, they are educators, protectors, and trusted members of a household. This Nanny Training Course is designed .........",
    link: "/nanny-training",
  },
  {
    id: 3,
    imageSrc: herobg3,
    alt: "Program 3 description",
    title: "Social Etiquette Training Course",
    summary:
      "Social Etiquette is more than just manners, it’s about presenting yourself in the best possible light while respecting the norms and expectations of any social ........",
    link: "/social-etiquette",
  },
  {
    id: 4,
    imageSrc: herobg4,
    alt: "Program 4 description",
    title: "Cultural Competence and Awareness Training Course",
    summary:
      "Cultural Competence and Awareness are vital in today’s  globalised world. Whether you're working with international clients, managing a diverse team, or hosting ......",
    link: "/cultural-competence",
  },
  {
    id: 5,
    imageSrc: herobg5,
    alt: "Program 5 description",
    title: "Silver Service Training Course",
    summary:
      "Silver Service is the gold standard in formal dining—precise, elegant, and refined. This course offers intensive training in the art of table setting, food and......",
    link: "/silver-service",
  },
  {
    id: 6,
    imageSrc: herobg6,
    alt: "Program 6 description",
    title: "Steward Training Course",
    summary:
      "A professional steward is the silent engine behind seamless personal service in high-end homes. This training is designed to equip stewards with the confidence......",
    link: "/steward-training",
  },
  {
    id: 7,
    imageSrc: herobg7,
    alt: "Program 7 description",
    title: "Butler Training Course",
    summary:
      "The butler is the gold standard in private household service—an ambassador of excellence. This course equips aspiring and practising butlers with the skills, knowledge........",
    link: "/butler-training",
  },
  {
    id: 8,
    imageSrc: herobg8,
    alt: "Program 8 description",
    title: "House Manager Training Course",
    summary:
      "A professional House Manager is the central figure in managing the day-to-day operations of private residences, especially those of high-net-worth individuals........",
    link: "/house-manager",
  },
  {
    id: 9,
    imageSrc: herobg9,
    alt: "Program 9 description",
    title: "Luxury Bed Making And Turn Down Services Training Course",
    summary:
      "In the realm of high-end hospitality, the art of luxury bed making and turn-down services is paramount. This skill transforms a simple room into a sanctuary of comfort.......",
    link: "/luxury-bed",
  },
];

const ProPage = () => {
  const [imageLoaded, setImageLoaded] = useState({});

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    // Force load all images on page mount
    const images = document.querySelectorAll("img[loading='lazy']");
    images.forEach((img) => {
      img.src = img.getAttribute("src"); // Use getAttribute to avoid self-assignment
    });
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div className="max-w-[1500px] mx-auto">
      <Header2 />
      <div className="lg:px-15 md:px-10 px-5 py-12 md:pb-12 p">
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl poppins font-bold text-[#333333]">
              Our Programs
            </h2>
            <p className="mt-2 poppins max-w-[430px] mx-auto text-[#333333]">
              Explore our diverse range of programs designed to empower you with
              skills and knowledge for personal and professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map(({ id, imageSrc, alt, title, summary, link }) => (
              <div
                key={id}
                className="bg-white rounded-lg rounded-t-2xl overflow-hidden flex flex-col"
              >
                <div className="h-h8">
                  {!imageLoaded[id] && (
                    <Skeleton
                      variant="rectangular"
                      className="w-full h-full"
                      animation="wave"
                    />
                  )}
                  <img
                    src={imageSrc}
                    alt={alt}
                    className="w-full h-48 object-cover"
                    // loading="lazy"
                    onLoad={() => handleImageLoad(id)}
                    style={{ display: imageLoaded[id] ? "block" : "none" }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-[20px] font-semibold poppins text-[#2E2F33] mb-2">
                    {title}
                  </h3>
                  <p className="text-[#5F6980] poppins text-sm mb-4 flex-grow">
                    {summary}
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <Link
                      to={link}
                      className="font-medium text-[#193728] poppins hover:underline"
                    >
                      View Program
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default ProPage;
