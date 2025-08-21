// src/components/FormStepThree.jsx
import { useState } from "react";

const FormStepThree = ({ formData, onPrevious, onNext }) => {
  const [localFormData, setLocalFormData] = useState(formData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!localFormData.fullName) newErrors.fullName = "Full Name is required";
    if (!localFormData.relationshipToStudent)
      newErrors.relationshipToStudent = "Relationship to Student is required";
    if (!localFormData.city) newErrors.city = "City is required";
    if (!localFormData.phoneNo) newErrors.phoneNo = "Phone Number is required";
    if (!localFormData.address) newErrors.address = "Address is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onNext(localFormData); // Changed from onSubmit to onNext
  };

  return (
    <div>
      {/* Form Container */}
      <div className="lg:px-12 md:px-7 px-2 rounded-t-2xl mb-15 overflow-hidden">
        <div className="bg-[#19392C] text-white rounded-t-2xl px-6 py-4">
          <h2 className="text-lg font-semibold">
            Emergency Contact Information (If Different From Above)
          </h2>
        </div>
        <div className="p-6 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={localFormData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                  placeholder="Enter full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship to Student{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={localFormData.relationshipToStudent}
                  onChange={(e) =>
                    handleInputChange("relationshipToStudent", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                  placeholder="Enter relationship to student"
                />
                {errors.relationshipToStudent && (
                  <p className="text-red-500 text-xs">
                    {errors.relationshipToStudent}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={localFormData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={localFormData.phoneNo}
                  onChange={(e) => handleInputChange("phoneNo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                  placeholder="Enter phone number"
                />
                {errors.phoneNo && (
                  <p className="text-red-500 text-xs">{errors.phoneNo}</p>
                )}
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={localFormData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors resize-none"
                  placeholder="Enter full address"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">{errors.address}</p>
                )}
                <div className="text-right mt-1">
                  <span className="text-xs text-gray-500">
                    {localFormData.address.length}/500
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-end justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onPrevious}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                Previous
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormStepThree;
