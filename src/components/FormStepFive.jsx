// src/components/FormStepFive.jsx
import { useState } from "react";

const FormStepFive = ({ formData, onNext, onPrevious }) => {
  const [localFormData, setLocalFormData] = useState({
    ...formData,
    hasMedicalConditions: formData.hasMedicalConditions ?? null, // Unchecked by default
    takesMedications: formData.takesMedications ?? null, // Unchecked by default
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCourseChange = (course) => {
    setLocalFormData((prev) => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter((c) => c !== course)
        : [...prev.courses, course],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (localFormData.courses.length === 0) {
      newErrors.courses = "Please select at least one course interest";
    }
    if (localFormData.hasMedicalConditions === null) {
      newErrors.hasMedicalConditions =
        "Please select Yes or No for medical conditions";
    }
    if (
      localFormData.hasMedicalConditions &&
      !localFormData.medicalConditions
    ) {
      newErrors.medicalConditions =
        "Please provide details of medical conditions";
    }
    if (localFormData.takesMedications === null) {
      newErrors.takesMedications = "Please select Yes or No for medications";
    }
    if (localFormData.takesMedications && !localFormData.medications) {
      newErrors.medications = "Please provide details of medications";
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
    onNext(localFormData);
  };

  return (
    <div>
      {/* Form Container */}
      <div className="lg:px-12 md:px-7 px-2 rounded-t-2xl mb-15 overflow-hidden">
        <div className="bg-[#19392C] text-white rounded-t-2xl px-6 py-4">
          <h2 className="text-lg font-semibold tracking-wide">
            Course Interest & Health Information
          </h2>
        </div>
        <div className="p-6 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Course Interest Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">
                  Please select your course interests:{" "}
                  <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Housemanager",
                    "Nanny",
                    "Butler",
                    "Steward",
                    "Housekeeper",
                  ].map((course) => (
                    <label
                      key={course}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={localFormData.courses.includes(course)}
                          onChange={() => handleCourseChange(course)}
                          className="w-4 h-4 border-2 border-gray-400 rounded-sm appearance-none checked:bg-white checked:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          aria-label={`Select ${course} course`}
                        />
                        {localFormData.courses.includes(course) && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-3 h-3 text-black"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {course}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.courses && (
                  <p className="text-red-500 text-xs">{errors.courses}</p>
                )}
              </div>

              {/* Medical Conditions Section */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm font-medium text-gray-900 leading-relaxed">
                      Does the student have any medical conditions or allergies?{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 ml-5 sm:ml-0">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={localFormData.hasMedicalConditions === true}
                          onChange={(e) =>
                            handleInputChange(
                              "hasMedicalConditions",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 border-2 border-gray-400 rounded-sm appearance-none checked:bg-white checked:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          aria-label="Has medical conditions: Yes"
                        />
                        {localFormData.hasMedicalConditions === true && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-3 h-3 text-black"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={localFormData.hasMedicalConditions === false}
                          onChange={(e) =>
                            handleInputChange(
                              "hasMedicalConditions",
                              !e.target.checked
                            )
                          }
                          className="w-4 h-4 border-2 border-gray-400 rounded-sm appearance-none checked:bg-white checked:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          aria-label="Has medical conditions: No"
                        />
                        {localFormData.hasMedicalConditions === false && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-3 h-3 text-black"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium">No</span>
                    </label>
                  </div>
                </div>
                <div className="ml-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    If yes, please provide details:{" "}
                    {localFormData.hasMedicalConditions === true && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <textarea
                    value={localFormData.medicalConditions}
                    onChange={(e) =>
                      handleInputChange("medicalConditions", e.target.value)
                    }
                    disabled={localFormData.hasMedicalConditions !== true}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors resize-none disabled:opacity-50"
                    placeholder="Enter details of medical conditions or allergies"
                    aria-label="Medical conditions details"
                  />
                  {errors.medicalConditions && (
                    <p className="text-red-500 text-xs">
                      {errors.medicalConditions}
                    </p>
                  )}
                  {errors.hasMedicalConditions && (
                    <p className="text-red-500 text-xs">
                      {errors.hasMedicalConditions}
                    </p>
                  )}
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500">
                      {localFormData.medicalConditions.length}/500
                    </span>
                  </div>
                </div>
              </div>

              {/* Medications Section */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm font-medium text-gray-900 leading-relaxed">
                      Is the student currently taking any medications?{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 ml-5 sm:ml-0">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={localFormData.takesMedications === true}
                          onChange={(e) =>
                            handleInputChange(
                              "takesMedications",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 border-2 border-gray-400 rounded-sm appearance-none checked:bg-white checked:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          aria-label="Takes medications: Yes"
                        />
                        {localFormData.takesMedications === true && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-3 h-3 text-black"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={localFormData.takesMedications === false}
                          onChange={(e) =>
                            handleInputChange(
                              "takesMedications",
                              !e.target.checked
                            )
                          }
                          className="w-4 h-4 border-2 border-gray-400 rounded-sm appearance-none checked:bg-white checked:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          aria-label="Takes medications: No"
                        />
                        {localFormData.takesMedications === false && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-3 h-3 text-black"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium">No</span>
                    </label>
                  </div>
                </div>
                <div className="ml-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    If yes, please provide details:{" "}
                    {localFormData.takesMedications === true && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <textarea
                    value={localFormData.medications}
                    onChange={(e) =>
                      handleInputChange("medications", e.target.value)
                    }
                    disabled={localFormData.takesMedications !== true}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors resize-none disabled:opacity-50"
                    placeholder="Enter details of medications"
                    aria-label="Medications details"
                  />
                  {errors.medications && (
                    <p className="text-red-500 text-xs">{errors.medications}</p>
                  )}
                  {errors.takesMedications && (
                    <p className="text-red-500 text-xs">
                      {errors.takesMedications}
                    </p>
                  )}
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500">
                      {localFormData.medications.length}/500
                    </span>
                  </div>
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
                aria-label="Go to next step"
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

export default FormStepFive;
