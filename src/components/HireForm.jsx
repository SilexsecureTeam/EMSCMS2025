import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import countries from "../data/countries";
import PageManagement from "../hooks/management";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const HireForm = () => {
  const navigate = useNavigate();
  const { createStaff } = PageManagement();

  const schema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phone: yup.string().required("Phone Number is required").matches(/^\d+$/, "Phone number must contain only digits"),
    staff_category: yup.string().required("Staff Category is required"),
    // years_of_experience: yup.number()
    //   .typeError("Experience must be a number")
    //   .required("Years of Experience is required")
    //   .min(0, "Experience cannot be negative"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    zip_code: yup.string(),
    interest_reason: yup.string().nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      staff_category: "",
      // years_of_experience: "",
      address: "",
      city: "",
      country: "",
      zip_code: "",
      interest_reason: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await toast.promise(
        createStaff(data),
        {
          pending: 'Submitting application...',
          success: 'Application sent successfully!',
          error: (err) => err.response?.data?.message || err.message || 'Application not sent',
        },
        {
          position: "top-right",
        }
      );

      reset();
      navigate("/success");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
    }
  };

  return (
    <div className="lg:px-15 md:px-10 px-5 mb-10">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-center">Staff Hire Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              {...register("first_name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter first name"
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              {...register("last_name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter last name"
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              {...register("phone")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="staff_category"
              className="block text-sm font-medium text-gray-700"
            >
              Staff Category <span className="text-red-500">*</span>
            </label>
            <select
              id="staff_category"
              name="staff_category"
              {...register("staff_category")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
            >
              <option value="">Select a category</option>
              <option value="housekeeper">Housekeeper</option>
              <option value="houseManager">House Manager</option>
              <option value="nanny">Nanny</option>
              <option value="butler">Butler</option>
              <option value="concierge">Concierge</option>
              <option value="steward">Steward</option>
            </select>
            {errors.staff_category && (
              <p className="mt-1 text-sm text-red-600">{errors.staff_category.message}</p>
            )}
          </div>

          {/* <div>
            <label
              htmlFor="years_of_experience"
              className="block text-sm font-medium text-gray-700"
            >
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="years_of_experience"
              name="years_of_experience"
              {...register("years_of_experience")}
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter years of experience"
            />
            {errors.years_of_experience && (
              <p className="mt-1 text-sm text-red-600">{errors.years_of_experience.message}</p>
            )}
          </div> */}

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              {...register("address")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              {...register("city")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter city"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              {...register("country")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="zip_code"
              className="block text-sm font-medium text-gray-700"
            >
              Zip Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              {...register("zip_code")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter zip code"
            />
            {errors.zip_code && (
              <p className="mt-1 text-sm text-red-600">{errors.zip_code.message}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="interest_reason"
            className="block text-sm font-medium text-gray-700"
          >
            Tell us more or describe your needs
          </label>
          <textarea
            id="interest_reason"
            name="interest_reason"
            {...register("interest_reason")}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
            placeholder="Write a few sentences about your needs..."
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              isSubmitting
                ? "bg-[#19392c]/70 cursor-not-allowed"
                : "bg-[#19392c] hover:bg-[#19392c]/90"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#19392c]`}
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
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HireForm;
