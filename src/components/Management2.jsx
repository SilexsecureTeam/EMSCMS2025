import React, { memo, useState } from "react";
import { MoveRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import blog1 from "../assets/header2.jpg";
import blog2 from "../assets/nanny.png";
import blog3 from "../assets/header5.png";
import blog4 from "../assets/header6.png";
import blog5 from "../assets/sliver.jpg";
import blog6 from "../assets/steward.jpg";
import blog7 from "../assets/header.png";
import blog8 from "../assets/header3.png";
import blog9 from "../assets/luxury.jpg";

const Management2 = memo(() => {
  const [activeId, setActiveId] = useState(null); 

  const containers = React.useMemo(
    () => [
      {
        id: 1,
        title: "Housekeeper Training Course",
        path: "/house-keeper",
        paragraph:
          "This course prepares participants to uphold international housekeeping standards, tailored to the cultural and practical realities of Nigerian homes...",
        img: blog1,
      },
      {
        id: 2,
        title: "Nanny Training Course",
        path: "/nanny-training",
        paragraph:
          "This Nanny Training Course is designed to equip participants with practical skills and professional standards tailored to high-net-worth homes and culturally diverse...",
        img: blog2,
      },
      {
        id: 3,
        title: "Social Etiquette Training",
        path: "/social-etiquette",
        paragraph:
          "This course equips participants with the essential skills and understanding to navigate a variety of social situations, whether at events, in professional...",
        img: blog3,
      },
      {
        id: 4,
        title: "Cultural Competence & Awareness Training",
        path: "/cultural-competence",
        paragraph:
          "This course equips participants with the tools and strategies to engage respectfully and effectively in multicultural settings, promoting a welcoming and inclusive....",
        img: blog4,
      },
      {
        id: 5,
        title: "Silver Service Training Course",
        path: "/silver-service",
        paragraph:
          "Silver Service is the gold standard in formal dining—precise, elegant, and refined. This course offers intensive training in the art of table setting, food and drink service...",
        img: blog5,
      },
      {
        id: 6,
        title: "Steward Training Course",
        path: "/steward-training",
        paragraph:
          "This training is designed to equip stewards with the confidence, competence, and cultural sensitivity needed to deliver world-class support in personal assistance...",
        img: blog6,
      },
      {
        id: 7,
        title: "Butler Training Course",
        path: "/butler-training",
        paragraph:
          "This course equips aspiring and practising butlers with the skills, knowledge, and professional demeanour to thrive in elite homes and formal environments...",
        img: blog7,
      },
      {
        id: 8,
        title: "House Manager Training Course",
        path: "/house-manager",
        paragraph:
          "This course prepares participants to take full ownership of household administration, staff coordination, budgeting, and emergency response...",
        img: blog8,
      },
      {
        id: 9,
        title: "Luxury Bed Making & Turn Down Services Training",
        path: "/luxury-bed",
        paragraph:
          "In the realm of high-end hospitality, the art of luxury bed making and turn-down services is paramount. This skill transforms a simple room into a sanctuary of comfort...",
        img: blog9,
      },
    ],
    []
  );

  const handleClick = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id)); 
  };

  return (
    <div className="sm:px-20 lg:px-15 md:px-10 px-5 home-2 py-10 pb-1 md:pb-10 text-">
      <h1 className="mb-3 text-[#333333] text-center inter font-semibold text-3xl md:text-[35px]">
        The Etiquette & Management Programs
      </h1>
      <p className="mb-8 font-light text-[#333333] max-w-[680px] text-center mx-auto inter text-lg md:text-[ 22px]">
        World-class domestic and etiquette training, customized for the
        realities of Nigerian and global households
      </p>
      <div className="flex flex-wrap -mx-2">
        {containers.map((container) => {
          const isActive = container.id === activeId; // Check if container is active
          return (
            <div
              key={container.id}
              className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
              onClick={() => handleClick(container.id)} // Added click handler
            >
              <Link to={container.path}>
                <div
                  className={`group relative cursor-pointer bg-[#19392c] h-96 lg:h-115 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 border border-gray-700/30 flex flex-col ${
                    isActive ? "bg-white text-black" : "" // Apply active styles
                  }`}
                >
                  {/* Top Half with Image Reveal */}
                  <div className="relative h-1/2 flex justify-center items-center transition-all duration-300">
                    {/* Image overlay on hover or active */}
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
                        isActive || "group-hover:opacity-100"
                      }`}
                      style={{ backgroundImage: `url(${container.img})` }}
                    />
                    <div className="relative inline-block z-10">
                      <div
                        className={`absolute inset-0 rounded-full backdrop-blur-md bg-black/30 transition-all duration-300 ${
                          isActive || "group-hover:opacity-100"
                        }`}
                      />
                      <h2
                        className={`relative z-10 text-white text-center py-3 px-6 rounded-full border border-[#c5ac8e] text-[14px] md:text-[15px] font-medium tracking-wide uppercase bg-transparent ${
                          isActive ? "text-black" : ""
                        }`}
                      >
                        {container.title}
                      </h2>
                    </div>
                  </div>

                  {/* Bottom Half with paragraph + arrow */}
                  <div
                    className={`flex flex-col justify-between h-1/2 p-6 border-t border-t-[#c5ac8e] transition-all duration-300 ${
                      isActive
                        ? "bg-white text-black"
                        : "group-hover:bg-white group-hover:text-black text-white"
                    }`}
                  >
                    <p className="text-sm md:text-[15px] font-normal leading-relaxed mb-4 max-w-[280px] line-clamp-4">
                      {container.paragraph}
                    </p>
                    <div className="flex items-center justify-start w-full">
                      <div className="bg-[#c5ac8e]/20 hover:bg-[#c5ac8e]/30 rounded-full p-3 transition-all duration-200">
                        <MoveRightIcon
                          className={`text-inherit ${
                            isActive
                              ? "translate-x-1"
                              : "group-hover:translate-x-1"
                          } transition-transform duration-200`}
                          size={20}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Management2;
