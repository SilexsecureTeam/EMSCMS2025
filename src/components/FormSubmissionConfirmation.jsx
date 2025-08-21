import { useState } from "react";

export default function FormSubmissionConfirmation() {
  const [employer, setEmployer] = useState("");
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="w-full mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-green-800 text-white px-6 py-4">
          <h2 className="text-lg font-semibold tracking-wide">
            AGREEMENT AND SIGNATURE:
          </h2>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Agreement Text */}
          <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
            <p className="text-sm text-gray-800 leading-relaxed">
              I certify that the information provided in this application is
              accurate and complete to the best of my knowledge. I understand
              that providing false information may result in the rejection of
              this application.
            </p>
          </div>

          {/* Signature Fields */}
          <div className="space-y-6 mt-8">
            {/* Employer Field */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0"></span>
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                  Employer:
                </span>
              </div>
              <div className="flex-1 relative ml-5 sm:ml-3">
                <input
                  type="text"
                  value={employer}
                  onChange={(e) => setEmployer(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none pb-1 text-sm text-gray-800"
                  placeholder="Enter employer name"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #6b7280 1px, transparent 1px)",
                    backgroundSize: "6px 2px",
                    backgroundPosition: "0 100%",
                    backgroundRepeat: "repeat-x",
                    minHeight: "24px",
                  }}
                />
              </div>
            </div>

            {/* Signature Field */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0"></span>
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                  Signature:
                </span>
              </div>
              <div className="flex-1 relative ml-5 sm:ml-3">
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none pb-1 text-sm text-gray-800"
                  placeholder="Enter signature"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #6b7280 1px, transparent 1px)",
                    backgroundSize: "6px 2px",
                    backgroundPosition: "0 100%",
                    backgroundRepeat: "repeat-x",
                    minHeight: "24px",
                  }}
                />
              </div>
            </div>

            {/* Date Field */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0"></span>
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                  Date:
                </span>
              </div>
              <div className="flex-1 relative ml-5 sm:ml-3">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none pb-1 text-sm text-gray-800"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #6b7280 1px, transparent 1px)",
                    backgroundSize: "6px 2px",
                    backgroundPosition: "0 100%",
                    backgroundRepeat: "repeat-x",
                    minHeight: "24px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-sm text-gray-800 leading-relaxed mb-2">
                <span className="font-semibold">NB:</span> Kindly pay the
                application processing fee of N50,000.00 to the account provided
                below:
              </p>
              <div className="space-y-1 text-sm text-gray-800 ml-4">
                <p>
                  <span className="font-medium">Bank Name:</span> Sterling Bank
                </p>
                <p>
                  <span className="font-medium">Account Number:</span>{" "}
                  1239888880
                </p>
                <p>
                  <span className="font-medium">Account Name:</span> The
                  Etiquette and Management School Limited.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              className="bg-green-800 hover:bg-green-900 text-white font-medium py-3 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={() => {
                // Handle form submission
                console.log("Form submitted:", { employer, signature, date });
              }}
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
