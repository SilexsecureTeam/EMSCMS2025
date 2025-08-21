// src/components/FormStepFour.jsx
import { useState } from "react";

const FormStepFour = ({ formData, onNext, onPrevious }) => {
  const [localFormData, setLocalFormData] = useState(formData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!localFormData.schoolName)
      newErrors.schoolName = "School Name is required";
    if (!localFormData.programName)
      newErrors.programName = "Program Name is required";
    if (!localFormData.gradeAchieved)
      newErrors.gradeAchieved = "Grade Achieved is required";
    if (!localFormData.englishLevelProficiency)
      newErrors.englishLevelProficiency =
        "English Level Proficiency is required";
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
    onNext(localFormData);
  };

  return (
    <div>
      {/* Form Container */}
      <div className="lg:px-12 md:px-7 px-2 rounded-t-2xl mb-15 overflow-hidden">
        <div className="bg-[#19392C] text-white rounded-t-2xl px-6 py-4">
          <h2 className="text-lg font-semibold">Education Level Achieved</h2>
        </div>
        <div className="p-6 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={localFormData.schoolName}
                  onChange={(e) =>
                    handleInputChange("schoolName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                  placeholder="Enter school name"
                />
                {errors.schoolName && (
                  <p className="text-red-500 text-xs">{errors.schoolName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={localFormData.programName}
                  onChange={(e) =>
                    handleInputChange("programName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                  placeholder="Enter program name"
                />
                {errors.programName && (
                  <p className="text-red-500 text-xs">{errors.programName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Achieved <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={localFormData.gradeAchieved}
                  onChange={(e) =>
                    handleInputChange("gradeAchieved", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                  placeholder="Enter grade achieved"
                />
                {errors.gradeAchieved && (
                  <p className="text-red-500 text-xs">{errors.gradeAchieved}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  English Level Proficiency{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  value={localFormData.englishLevelProficiency}
                  onChange={(e) =>
                    handleInputChange("englishLevelProficiency", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors appearance-none bg-white"
                >
                  <option value=""></option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                {errors.englishLevelProficiency && (
                  <p className="text-red-500 text-xs">
                    {errors.englishLevelProficiency}
                  </p>
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

export default FormStepFour;
