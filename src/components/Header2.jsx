import React, { useState, useEffect, useCallback, memo } from "react";
import newlogo from "../assets/Group.svg";
import vector from "../assets/Vector.png";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import face from "../assets/facebook.svg";
import insta from "../assets/instagram.svg";
import twi from "../assets/twitter.svg";
import lin from "../assets/linkedin.svg";
import Skeleton from "@mui/material/Skeleton";
import PageManagement from "../hooks/management";

const Header2 = memo(() => {
  const [isSubProgramOpen, setIsSubProgramOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProgramOpen, setIsMobileProgramOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [vectorLoaded, setVectorLoaded] = useState(false);
  const [programs, setPrograms] = useState([]);

  const { getPrograms } = PageManagement();

  // Fetch programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getPrograms();
        if (response) {
          setPrograms(response || []);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  // Preload images
  useEffect(() => {
    const preloadImages = [newlogo, vector];
    preloadImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (index === 0) setLogoLoaded(true);
        if (index === 1) setVectorLoaded(true);
      };
    });
  }, []);

  const toggleSubProgram = useCallback(
    () => setIsSubProgramOpen((prev) => !prev),
    []
  );
  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );
  const toggleMobileProgram = useCallback(
    () => setIsMobileProgramOpen((prev) => !prev),
    []
  );

  return (
    <div className="flex items-center home-2 lg:px-14 md:px-10 px-5 justify-between bg-white w-full h-[100px] ">
      {!logoLoaded ? (
        <Skeleton variant="rectangular" width={250} height={48} />
      ) : (
        <NavLink to="/">
          <img
            src={newlogo}
            className="lg:h-12 h-9 cursor-pointer"
            alt="logo"
            loading="eager"
            decoding="async"
          />
        </NavLink>
      )}

      {/* Desktop Menu */}
      <div className="md:flex hidden items-center gap-x-1.5 text-[#333333] justify-between font-semibold ">
        <div className="flex items-center space-x-3.5">
          <NavLink to="/">
            <h4 className="lg:text-[16px] text-[14px] font-semibold text-[#333333]">Home</h4>
          </NavLink>
          <NavLink to="/about">
            <h4 className="lg:text-[16px] text-[14px] font-semibold text-[#333333]">About us</h4>
          </NavLink>

          {/* Programmes Dropdown */}
          <ul className="relative ">
            <li
              className="relative flex items-center font-semibold lg:text-[16px] text-[14px] justify-between text-[#333333]"
              onMouseEnter={toggleSubProgram}
              onMouseLeave={toggleSubProgram}
            >
              Programmes{" "}
              {!vectorLoaded ? (
                <Skeleton variant="rectangular" width={16} height={16} className="pt-1 pl-1" />
              ) : (
                <img
                  src={vector}
                  alt="vector"
                  className="cursor-pointer pt-1 pl-1"
                  loading="eager"
                  decoding="async"
                />
              )}
              {isSubProgramOpen && (
                <ul className="absolute left-0 top-full w-[280px] text-sm z-40 bg-white rounded-md shadow-lg py-1">
                  {programs.length > 0 ? (
                    programs.map((program) => (
                      <li key={program.id}>
                        <NavLink
                          to={`/programs/${program.slug}`}
                          className="block px-2 py-3 text-[#333333] hover:bg-[#C3AA8C]"
                        >
                          {program.title}
                        </NavLink>
                      </li>
                    ))
                  ) : (
                    <li className="px-2 py-3 text-gray-500">Loading...</li>
                  )}
                </ul>
              )}
            </li>
          </ul>

          <NavLink to="/gallery">
            <h4 className="lg:text-[16px] text-[14px] font-semibold text-[#333333]">Gallery</h4>
          </NavLink>
          <NavLink to="/blog">
            <h4 className="lg:text-[16px] text-[14px] font-semibold text-[#333333]">Blog</h4>
          </NavLink>
          <NavLink to="/career">
            <h4 className="lg:text-[16px] text-[14px] font-semibold text-[#333333]">Career</h4>
          </NavLink>
          <NavLink to="/contact">
            <h4 className="lg:text-[16px] text-[14px] font-semibold text-[#333333]">Contact Us</h4>
          </NavLink>
        </div>
      </div>

      {/* Socials + Enroll */}
      <div className="hidden md:flex md:items-center space-x-1.5">
        <div className="flex items-center space-x-1.5">
          <NavLink to="https://www.instagram.com/EMS_Abuja">
            <img src={insta} alt="instagram" className="w-[22px] h-[22px] cursor-pointer bg-[#19392c]" />
          </NavLink>
          <NavLink to="https://x.com/EMS_Abuja">
            <img src={twi} alt="twitter" className="w-[22px] h-[22px] cursor-pointer bg-[#19392c]" />
          </NavLink>
          <a href="https://www.facebook.com/share/163L6LZhYo/?mibextid=wwXlfr"> <img src={face} alt="facebook" className="w-[22px] h-[22px] cursor-pointer bg-[#19392c]" /></a>
         <a href="https://www.linkedin.com/company/the-etiquette-and-management-school-limited/">
           <img src={lin} alt="linkedin" className="w-[22px] h-[22px] cursor-pointer bg-[#19392c]" />
         </a>
        </div>
        <NavLink to="/enroll">
          <button className="hidden md:block bg-[#19392c] text-sm font-semibold cursor-pointer text-white px-2 py-1.5">
            Enroll Now
          </button>
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center mr-4 p-2 cursor-pointer text-white bg-[#19392c] focus:outline-none">
        <button onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[100px] pb-6 left-0 w-full bg-white shadow-lg md:hidden z-50">
          <ul className="flex flex-col text-[#333333] font-semibold">
            <NavLink to="/"><li className="px-4 py-2">Home</li></NavLink>
            <NavLink to="/about"><li className="px-4 py-2">About Us</li></NavLink>

            {/* Mobile Programs */}
            <li>
              <button
                className="w-full text-left px-4 py-2 flex items-center justify-between"
                onClick={toggleMobileProgram}
              >
                Programmes{" "}
                {!vectorLoaded ? (
                  <Skeleton variant="rectangular" width={12} height={12} className="ml-2" />
                ) : (
                  <img src={vector} alt="arrow" className="ml-2 w-3" />
                )}
              </button>
              {isMobileProgramOpen && (
                <ul className="pl-4 bg-gray-50">
                  {programs.length > 0 ? (
                    programs.map((program) => (
                      <li key={program.id}>
                        <NavLink
                          to={`/programs/${program.slug}`}
                          className="block px-4 py-2 hover:bg-[#C3AA8C]"
                        >
                          {program.title}
                        </NavLink>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">Loading...</li>
                  )}
                </ul>
              )}
            </li>

            <NavLink to="/gallery"><li className="px-4 py-2">Gallery</li></NavLink>
            <NavLink to="/blog"><li className="px-4 py-2">Blog</li></NavLink>
            <NavLink to="/career"><li className="px-4 py-2">Career</li></NavLink>
            <NavLink to="/contact"><li className="px-4 py-2">Contact Us</li></NavLink>

            <div className="flex justify-center w-full space-x-4 mt-3">
              <NavLink to="https://www.instagram.com/EMS_Abuja">
                <img src={insta} alt="instagram" className="w-[22px] h-[22px] cursor-pointer bg-[#19392c]" />
              </NavLink>
              <NavLink to="https://x.com/EMS_Abuja">
                <img src={twi} alt="twitter" className="w-[22px] h-[22px] cursor-pointer bg-[#19392c]" />
              </NavLink>
              <img src={face} alt="facebook" className="w-[22px] h-[22px] cursor-pointer bg-[#19392c]" />
              <img src={lin} alt="linkedin" className="w-[22px] h-[22px] cursor-pointer bg-[#19392c]" />
            </div>

            <NavLink to="/enroll">
              <button className="mt-3 mx-4 w-[90%] bg-[#19392c] text-[18px] font-semibold text-white px-3 py-1.5">
                Enroll Now
              </button>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
});

export default Header2;
