import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";
import { SiX } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PageManagement from "../hooks/management";

const Contact = () => {
  const navigate = useNavigate();
  const { createContact } = PageManagement();

  // Define validation schema to match dashboard
  const schema = yup.object().shape({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phone_number: yup.string().required("Phone number is required"),
    subject: yup.string().required("Subject is required"),
    message: yup.string().required("Message is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone_number: "",
      subject: "general",
      message: "",
    },
  });

  const selectedSubject = watch("subject");

  const subjects = [
    { id: "general", label: "General Inquiry" },
    { id: "program", label: "Program Inquiry" },
    { id: "feedback", label: "Feedback & Suggestions" },
    { id: "payment", label: "Report Payment" },
  ];

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const payload = new FormData();
      payload.append("firstname", data.firstname);
      payload.append("lastname", data.lastname);
      payload.append("email", data.email);
      payload.append("phone_number", data.phone_number);
      payload.append("subject", data.subject);
      payload.append("message", data.message);

      await toast.promise(createContact(payload), {
        pending: "Sending message...",
        success: "Message sent successfully",
        error: (error) => error.response?.data?.message || "Failed to send message",
      });

      reset(); // Clear form after successful submission
      navigate("/submit"); // Navigate to success page
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="py-10 md:pb-30 lg:px-18 md:px-12 px-6 p">
      {/* Heading */}
      <div className="w-full mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-4xl text-[#c5ac8e] poppins font-bold">
          Contact Us
        </h2>
        <p className="mt-2 text-[#717171] poppins font-medium text-sm md:text-base">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full mx-auto bg-white rounded-xl p-1.5 shadow-lg flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="bg-[#8C6239] text-white flex flex-col justify-between rounded-xl md:w-2/5 px-8 py-12">
          <div>
            <h3 className="text-xl md:text-[28px] poppins font-semibold">
              Contact Information
            </h3>
          </div>
          <ul className="space-y-10 mt-6">
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-4" />
              <span className="text-[#E5E5E5] poppins">
                (+234) 704 840 6083
              </span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-4" />
              <span className="text-[#E5E5E5] poppins break-all">
                info@etiquettemanagementschool.com
              </span>
            </li>
            <li className="flex items-center">
              <MapPin className="w-5 h-5 mr-4" />
              <span className="text-[#E5E5E5] poppins">
                Area 11, Garki, Abuja.
              </span>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-12">
            <a
              href="https://www.instagram.com/EMS_Abuja"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D09B66] rounded-full text-[#333333] hover:bg-white cursor-pointer"
            >
              <InstagramIcon className="w-10 h-10 p-2" />
            </a>
            <a
              href="https://x.com/EMS_Abuja"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D09B66] rounded-full text-[#333333] hover:bg-white cursor-pointer"
            >
              <SiX className="w-10 h-10 p-2" />
            </a>
            <a
              href="#"
              className="bg-[#D09B66] rounded-full text-[#333333] hover:bg-white cursor-pointer"
            >
              <FaFacebookF className="w-10 h-10 p-2" />
            </a>
            <a
              href="#"
              className="bg-[#D09B66] rounded-full text-[#333333] hover:bg-white cursor-pointer"
            >
              <LinkedinIcon className="w-10 h-10 p-2" />
            </a>
          </div>
        </div>

        {/* Right Panel - Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-3/5 md:p-14 p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-normal poppins text-[#333333] mb-1">
                First Name
              </label>
              <input
                type="text"
                {...register("firstname")}
                placeholder="Add your first name"
                className="w-full border-b border-gray-300 focus:outline-none pb-1"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-normal poppins text-[#333333] mb-1">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastname")}
                placeholder="Add your last name"
                className="w-full border-b border-gray-300 focus:outline-none pb-1"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-normal poppins text-[#333333] mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Add your email"
                className="w-full border-b border-gray-300 focus:outline-none pb-1"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-normal poppins text-[#333333] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone_number")}
                placeholder="Add your phone number"
                className="w-full border-b border-gray-300 focus:outline-none pb-1"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-black poppins font-semibold text-sm mb-2">
              Select Subject?
            </p>
            <div className="flex flex-wrap gap-6 w-full">
              {subjects.map((s) => (
                <label key={s.id} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    {...register("subject")}
                    value={s.id}
                    className="sr-only"
                  />
                  <span
                    className={`w-3 h-3 mr-2 rounded-full border ${
                      selectedSubject === s.id
                        ? "border-[#19392c] bg-[#19392c]"
                        : "border-gray-400"
                    }`}
                  ></span>
                  <span className="text-[#333333] poppins">{s.label}</span>
                </label>
              ))}
            </div>
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label className="block text-base font-medium text-[#8D8D8D] mb-2">
              Message
            </label>
            <textarea
              {...register("message")}
              rows={4}
              placeholder="Write your message..."
              className="w-full border-b border-gray-300 focus:outline-none"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg flex items-center justify-center ${
                isSubmitting
                  ? "bg-[#19392c]/70 cursor-not-allowed"
                  : "bg-[#19392c] hover:opacity-90"
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;