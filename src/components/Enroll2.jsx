import React, { useState, useEffect, memo } from "react";
import { GraduationCapIcon, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import waiter from "../assets/champagne.png";
import Skeleton from "@mui/material/Skeleton";

const Enroll2 = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = waiter;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="py-10 lg:px-15 md:px-10 px-5 home-2">
      <div className="bg-[#CFBDA2] w-full h-fit py-9 md:px-10 px-2.5">
        <h1 className="font-semibold mb-3 text-[#333333] text-center w-full text-2xl md:text-[36px] lg:text-[48px]">
          What our students say
        </h1>
        <p className="font-normal block mb-5 mx-auto text-center text-[#333333] max-w-[678px] text-base">
          Lorem ipsum dolor sit amet consectetur in in dignissim vulputate
          lectus enim placerat praesent diam nisl eu duis hendrerit in v.
        </p>
        <div className="flex justify-between lg:flex-row flex-col gap-5 items-center gap-x-3">
          <div className="flex gap-5 justify-between enroll w-full lg:w-1/3 gap-x-5 lg:flex-col rounded-xl">
            <div className="relative p-5 lg:h-[168px] h-[200px] w-[288px] rounded-xl bg-white">
              <p className="text-[#333333] font-semibold text-[36px]">10k+</p>
              <p className="font-normal text-[16px] text-[#333333]">
                Students graduated
              </p>
              <GraduationCapIcon
                size={20}
                color="#333333"
                className="absolute bottom-3 right-3"
              />
            </div>
            <div className="relative p-5 lg:h-[323px] h-[200px] w-[288px] rounded-xl bg-white">
              <p className="text-[#333333] font-semibold text-[36px]">15k+</p>
              <p className="font-normal text-[16px] lg:mb-15 mb-2 text-[#333333]">
                Management programs
              </p>
              <p className="font-normal text-[16px] text-[#333333] w-[220px]">
                Lorem ipsum dolor sit amet consectetur in in dignissim vulputate
                lectus enim.
              </p>
              <GraduationCapIcon
                size={20}
                color="#333333"
                className="absolute bottom-3 right-3"
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col relative gap-x-7 w-full gap-5 lg:w-2/3 md:h-[515px]h-fit bg-white rounded-xl md:p-6 p-3 pb-20">
            {!imageLoaded ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={400}
                className="md:h-full md:w-2/5"
              />
            ) : (
              <img
                src={waiter}
                alt="w"
                className="md:h-full object-fill h-[400px] md:w-2/5 w-full"
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="md:w-3/5 w-full">
              <p className="md:max-w-[360px] w-full mb-5 mt-6 text-[#333333] font-semibold text-[20px]">
                “We had such a wonderful time! Well done to the team . Thank you
                for all you do.”
              </p>
              <p className="md:max-w-[360px] w-full font-normal text-[16px]">
                Lorem ipsum dolor sit amet consectetur in in dignissim vulputate
                lectus enim diam plac erat praesent diam nisl.
              </p>
              <div className="flex justify-between absolute bottom-5 w-[95%] items-center sm:w-[320px]">
                <div className="">
                  <p className="font-semibold text-base mb-1">Bola Rice</p>
                  <p className="font-normal text-[#333333] text-base">
                    Abuja, Nigeria
                  </p>
                </div>
                <div className="flex gap-x-4">
                  <MoveLeftIcon
                    size={25}
                    className="cursor-pointer text-[#333333] p-1 rounded-full border-1 border-[#333333]"
                  />
                  <MoveRightIcon
                    size={25}
                    className="cursor-pointer text-[#333333] p-1 rounded-full border-1 border-[#333333]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-5 block rounded-xl mx-auto bg-[#193728] text-[21px] font-semibold cursor-pointer text-white px-3 py-1.5">
          Enroll Now
        </button>
      </div>
    </div>
  );
});

export default Enroll2;
