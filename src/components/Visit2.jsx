import React, { memo, useState } from "react";
import { MailOpenIcon, MoveRightIcon, SmartphoneIcon } from "lucide-react";

const Visit2 = memo(() => {
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const applied = form.applied.value;

    if (!applied) {
      setShowError(true);
      return;
    }

    setShowError(false);
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    console.log("Submitted data:", values);
    form.reset();
  };

  return (
    <div className="py-10 lg:px-15 md:px-10 px-5 home-2">
      <div className="bg-[#E7E7E7] py-10 px-4 sm:px-7 rounded-sm max-full mx-auto">
        <div className="grid grid-cols-1 place-content-between lg:grid-cols-2 gap-8">
          <div className="form w-full">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Error message */}
              {showError && (
                <p className="text-red-600 text-sm font-medium">
                  Please select if you have applied already.
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-1 font-semibold text-[16px] text-[#333333]"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Grace Henry"
                    className="w-full bg-[#d1d1d1] font-medium text-[16px] py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#193728] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 font-semibold text-[16px] text-[#333333]"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="grace@example.com"
                    className="w-full bg-[#d1d1d1] font-medium text-[16px] py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#193728] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1 font-semibold text-[16px] text-[#333333]"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(+234) 702 333 444"
                    className="w-full bg-[#d1d1d1] font-medium text-[16px] py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#193728] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="properties"
                    className="block mb-1 font-semibold text-[16px] text-[#333333]"
                  >
                    No of Properties
                  </label>
                  <input
                    id="properties"
                    name="properties"
                    type="number"
                    required
                    placeholder="2"
                    className="w-full bg-[#d1d1d1] font-medium text-[16px] py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#193728] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="visitDay"
                    className="block mb-1 font-semibold text-[16px] text-[#333333]"
                  >
                    Day of Visit
                  </label>
                  <input
                    id="visitDay"
                    name="visitDay"
                    type="date"
                    required
                    className="w-full bg-[#d1d1d1] font-medium text-[16px] py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#193728] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="visitTime"
                    className="block mb-1 font-semibold text-[16px] text-[#333333]"
                  >
                    Time of Visit
                  </label>
                  <input
                    id="visitTime"
                    name="visitTime"
                    type="time"
                    required
                    className="w-full bg-[#d1d1d1] font-medium text-[16px] py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#193728] transition"
                  />
                </div>
              </div>

              <div>
                <p className="font-semibold text-[16px] text-[#333333] mb-2">
                  Have you applied already?
                </p>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer space-x-2">
                    <input
                      type="radio"
                      name="applied"
                      value="yes"
                      className="peer font-medium sr-only"
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-[#d1d1d1] bg-[#d1d1d1] peer-checked:bg-[#193728] transition"></div>
                    <span className="text-gray-800">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer space-x-2">
                    <input
                      type="radio"
                      name="applied"
                      value="no"
                      className="peer font-medium sr-only"
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-[#d1d1d1] bg-[#d1d1d1] peer-checked:bg-[#193728] transition"></div>
                    <span className="text-gray-800">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 font-semibold text-[16px] text-[#333333]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Add any additional information..."
                  className="w-full font-medium bg-[#d1d1d1] text-[16px] py-3 px-4 rounded-md h-24 resize-y focus:outline-none focus:ring-2 focus:ring-[#193728] transition"
                ></textarea>
              </div>

              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-[#193728] text-white py-3 px-6 rounded-md text-[16px] font-semibold hover:bg-[#2a503e] transition duration-300"
                >
                  Request Info
                </button>
              </div>
            </form>
          </div>

          {/* Right Content remains unchanged */}
          <div className="flex flex-col items-end">
            <div className="text-[#333333] w-full lg:w-[90%] space-y-6">
              <h1 className="font-semibold lg:pl-17 text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Visit us today
              </h1>
              <p className="text-[16px] lg:pl-17 font-normal max-w-[500px]">
                Lorem ipsum dolor sit amet consectetur oonvallis ut quis eget
                adipiscing accumsan consectetur malesuada.
              </p>
              <div className="space-y-4 lg:pl-17">
                <div className="flex items-center flex-col md:flex-row gap-x-4">
                  <MailOpenIcon size={24} className="text-[#193728]" />
                  <p className="text-[16px] font-normal">
                    Send us an email <br />
                    <span className="font-semibold text-12 poppins sm:text-base">
                      info@etiquettemanagementschool.com
                    </span>
                  </p>
                </div>
                <div className="flex items-center flex-col md:flex-row gap-x-4">
                  <SmartphoneIcon size={24} className="text-[#193728]" />
                  <p className="text-[16px] font-normal">
                    Give us a call <br />
                    <span className="font-semibold text-12 sm:text-base poppins ">
                      +234 704 840 6083
                    </span>
                  </p>
                </div>
              </div>
              <div className="p-6 text-white bg-[#193728] rounded-md mt-8 lg:mt-20">
                <h2 className="font-semibold text-2xl mb-4">
                  Not convinced yet?
                </h2>
                <p className="font-normal text-[16px] mb-6 max-w-sm">
                  Lorem ipsum dolor sit amet consectetur oonvallis ut quis eget
                  adipiscing.
                </p>
                <div className="flex items-center gap-x-4">
                  <a
                    href="#"
                    className="text-[16px] font-semibold hover:underline"
                  >
                    Browse all programs
                  </a>
                  <MoveRightIcon
                    size={20}
                    className="p-0.5 rounded-full border-2 border-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Visit2;
