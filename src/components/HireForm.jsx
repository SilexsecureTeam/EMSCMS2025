import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import countries from "../data/countries"; // Adjust path as needed

const HireForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    staffCategory: "",
    experience: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    note: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const res = await fetch("https://ems-backend-qif8.onrender.com/api/hire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Application sent successfully!", {
          duration: 3000,
          position: "top-right",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          staffCategory: "",
          experience: "",
          address: "",
          city: "",
          country: "",
          zipCode: "",
          note: "",
        });
        navigate("/success");
      } else {
        toast.error(data.message || "Application not sent", {
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="lg:px-15 md:px-10 px-5 mb-10">
      {/* Toaster for react-hot-toast */}
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-center">Staff Hire Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter last name"
            />
          </div>

          {/* Email */}
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
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter email"
            />
          </div>

          {/* Phone */}
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
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter phone number"
            />
          </div>

          {/* Staff Category */}
          <div>
            <label
              htmlFor="staffCategory"
              className="block text-sm font-medium text-gray-700"
            >
              Staff Category <span className="text-red-500">*</span>
            </label>
            <select
              id="staffCategory"
              name="staffCategory"
              value={formData.staffCategory}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="housekeeper">Housekeeper</option>
              <option value="houseManager">House Manager</option>
              <option value="nanny">Nanny</option>
              <option value="butler">Butler</option>
              <option value="concierge">Concierge</option>
              <option value="steward">Steward</option>
            </select>
          </div>

          {/* Years of Experience */}
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter years of experience"
            />
          </div>

          {/* Address */}
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
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter address"
            />
          </div>

          {/* City */}
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
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter city"
            />
          </div>

          {/* Country */}
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
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Zip Code */}
          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700"
            >
              Zip Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
              placeholder="Enter zip code"
            />
          </div>
        </div>

        {/* Textarea for Motivation */}
        <div>
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700"
          >
            Why are you interested in this role?
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#19392c] focus:border-[#19392c] sm:text-sm"
            placeholder="Write a few sentences about your motivation..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              isLoading
                ? "bg-[#19392c]/70 cursor-not-allowed"
                : "bg-[#19392c] hover:bg-[#19392c]/90"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#19392c]`}
          >
            {isLoading ? (
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