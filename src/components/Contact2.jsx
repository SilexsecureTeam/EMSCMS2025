import { MapPin, Phone, Mail } from "lucide-react";
import React, { memo } from "react";

const Contact2 = memo(({ email }) => {
  return (
    <div className="bg-[#c5ac8e] lg:px-15 md:px-10 px-5 py-6">
      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-400">
        <div className="flex items-center gap-4 py-4">
          <MapPin className="text-gray-700 shrink-0" />
          <div>
            <p className="text-sm text-gray-800">Address</p>
            <p className="font-semibold text-gray-800">Area 11, Garki Abuja</p>
          </div>
        </div>
        <div className="flex sm:justify-center items-center gap-4 sm:pl-2 py-4">
          <Phone className="text-gray-700 shrink-0" />
          <div>
            <p className="text-sm text-gray-800">Phone</p>
            <p className="font-semibold text-gray-800">+234 704 840 6083</p>
          </div>
        </div>
        <div className="flex sm:justify-end items-center sm:pl-2 gap-4 py-4">
          <Mail className="text-gray-700 shrink-0" />
          <div>
            <p className="text-sm text-gray-800">Email</p>
            <p className="font-semibold text-gray-800">
              {email || "info@etiquettemanagementschool.com"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Contact2;