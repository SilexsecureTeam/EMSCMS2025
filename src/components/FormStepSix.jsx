// src/components/FormStepSix.jsx
import { useState } from "react";

const FormStepSix = ({ formData, onPrevious, onSubmit }) => {
  const [localFormData, setLocalFormData] = useState(formData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!localFormData.trainingGoals) {
      newErrors.trainingGoals =
        "Please specify what the employee should gain from this training";
    }
    if (!localFormData.additionalInfo) {
      newErrors.additionalInfo =
        "Please provide additional information about the student";
    }
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
    onSubmit(localFormData);
  };

  return (
    <div>
      {/* Form Container */}
      <div className="lg:px-12 md:px-7 px-2 rounded-t-2xl mb-15 overflow-hidden">
        <div className="bg-[#19392C] text-white rounded-t-2xl px-6 py-4">
          <h2 className="text-lg font-semibold tracking-wide">
            Additional Information
          </h2>
        </div>
        <div className="p-6 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* First Div: Training Goals */}
              <div className="flex-1 space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Employer, what would you like your employee to gain from this
                  training? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={localFormData.trainingGoals}
                  onChange={(e) =>
                    handleInputChange("trainingGoals", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors resize-none"
                  placeholder="Enter expected training outcomes"
                  aria-label="Expected training outcomes"
                />
                {errors.trainingGoals && (
                  <p className="text-red-500 text-xs">{errors.trainingGoals}</p>
                )}
                <div className="text-right mt-1">
                  <span className="text-xs text-gray-500">
                    {localFormData.trainingGoals.length}/500
                  </span>
                </div>
              </div>

              {/* Second Div: Additional Information */}
              <div className="flex-1 space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Employer, please provide any additional information about the
                  student: <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={localFormData.additionalInfo}
                  onChange={(e) =>
                    handleInputChange("additionalInfo", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors resize-none"
                  placeholder="Enter additional information"
                  aria-label="Additional information about the student"
                />
                {errors.additionalInfo && (
                  <p className="text-red-500 text-xs">
                    {errors.additionalInfo}
                  </p>
                )}
                <div className="text-right mt-1">
                  <span className="text-xs text-gray-500">
                    {localFormData.additionalInfo.length}/500
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onPrevious}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                aria-label="Go to previous step"
              >
                Previous
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                aria-label="Submit form"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormStepSix;
