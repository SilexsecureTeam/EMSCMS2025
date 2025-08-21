// src/components/MultiStepForm.jsx
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";
import FormStepFour from "./FormStepFour";
import FormStepFive from "./FormStepFive";
import FormStepSix from "./FormStepSix";
import FormSubmissionConfirmation from "./FormSubmissionConfirmation";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    stepOne: {
      photo: null,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      email: "",
      phone: "",
      address: "",
    },
    stepTwo: {
      fullName: "",
      relationshipToStudent: "",
      occupation: "",
      nationality: "",
      city: "",
      phoneNo: "",
      address: "",
    },
    stepThree: {
      fullName: "",
      relationshipToStudent: "",
      city: "",
      phoneNo: "",
      address: "",
    },
    stepFour: {
      schoolName: "",
      programName: "",
      gradeAchieved: "",
      englishLevelProficiency: "",
      address: "",
    },
    stepFive: {
      courses: [],
      hasMedicalConditions: null,
      medicalConditions: "",
      takesMedications: null,
      medications: "",
    },
    stepSix: {
      trainingGoals: "",
      additionalInfo: "",
    },
  });

  const steps = [
    {
      id: 1,
      title: "Student Details",
      description: "Provide personal information and photo",
    },
    {
      id: 2,
      title: "Employers Information",
      description: "Enter employer details and contact information",
    },
    {
      id: 3,
      title: "Emergency Contact Information (If Different From Above)",
      description: "Specify emergency contact details",
    },
    {
      id: 4,
      title: "Education Level Achieved",
      description: "Detail your educational background",
    },
    {
      id: 5,
      title: "Course Interest & Health Information",
      description: "Select courses and provide health details",
    },
    {
      id: 6,
      title: "Additional Information",
      description: "Provide employer expectations and additional details",
    },
  ];

  const handleNext = (stepKey, stepData) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: stepData,
    }));
    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleFinalSubmit = (stepKey, stepData) => {
    const finalData = {
      ...formData,
      [stepKey]: stepData,
    };
    console.log("Final submitted data:", finalData);
    setStep(7); // Move to confirmation step
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full ">
        {/* Enhanced Progress Indicator */}
        {step <= 6 && (
          <div className="mb-8 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {step} of {steps.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((step / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#19392C] to-[#2d5a43] h-3 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${(step / steps.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-[#19392C] text-lg">
                {steps[step - 1].title}
              </h3>
              <p className="text-gray-600 text-sm">
                {steps[step - 1].description}
              </p>
            </div>
          </div>
        )}

        {/* Render Current Step */}
        {step === 1 && (
          <FormStepOne
            formData={formData.stepOne}
            onNext={(data) => handleNext("stepOne", data)}
          />
        )}
        {step === 2 && (
          <FormStepTwo
            formData={formData.stepTwo}
            onNext={(data) => handleNext("stepTwo", data)}
            onPrevious={handlePrevious}
          />
        )}
        {step === 3 && (
          <FormStepThree
            formData={formData.stepThree}
            onNext={(data) => handleNext("stepThree", data)}
            onPrevious={handlePrevious}
          />
        )}
        {step === 4 && (
          <FormStepFour
            formData={formData.stepFour}
            onNext={(data) => handleNext("stepFour", data)}
            onPrevious={handlePrevious}
          />
        )}
        {step === 5 && (
          <FormStepFive
            formData={formData.stepFive}
            onNext={(data) => handleNext("stepFive", data)}
            onPrevious={handlePrevious}
          />
        )}
        {step === 6 && (
          <FormStepSix
            formData={formData.stepSix}
            onSubmit={(data) => handleFinalSubmit("stepSix", data)}
            onPrevious={handlePrevious}
          />
        )}
        {step === 7 && <FormSubmissionConfirmation />}
      </div>
    </div>
  );
};

export default MultiStepForm;
