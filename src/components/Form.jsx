import enroll from "../assets/enroll.png";
import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const Form = () => {
  const [formData, setFormData] = useState({
    photo: null,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    address: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
    }));
    setPreviewUrl(null);
  };

  return (
    <div className="">
      <img src={enroll} alt="Enroll" className="w-full h-auto mb-4" />
      <div className="my-10 lg:px-15 md:px-10 px-5">
        <h2 className="text-lg font-bold poppins mb-2">Instruction:</h2>
        <ol className="list-decimal poppins list-inside">
          <li className="poppins font-medium">
            When completing this form, kindly use BLOCK LETTERS.
          </li>
          <li className="poppins font-medium">
            Completed forms should be submitted to
            admissions@etiquettemangementschool.com
          </li>
          <li className="poppins font-medium">
            Attach a photocopy of the employee's means of identification to this
            form.
          </li>
          <li className="poppins font-medium">
            Attach proof of processing fee payment to this form.
          </li>
          <li className="poppins font-medium">
            For further inquiries, please contact +234 704 840 6083.
          </li>
        </ol>
      </div>
      {/* form container */}
      <div className="lg:px-12 md:px-7 px-2 rounded-t-2xl mb-15 overflow-hidden">
        {/* Header */}
        <div className="bg-[#19392C] text-white rounded-t-2xl px-6 py-4">
          <h2 className="text-lg font-semibold">Student Details</h2>
        </div>

        {/* Form Content */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white">
            {/* Photo Upload Section */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                {previewUrl ? (
                  <div className="relative group">
                    <img
                      src={previewUrl}
                      alt="Student"
                      className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
                    />
                    <button
                      onClick={removePhoto}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        Click to change
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="photo-upload"
                    />
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      Drag and drop or click here to select file
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                    placeholder="Enter first name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                    placeholder="Enter last name"
                  />
                </div>
                <div className="flex flex-col w-full md:flex-row gap-6">
                  {/* Date & Place of Birth */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date & Place of Birth{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                      placeholder="Enter date and place of birth"
                    />
                  </div>

                  {/* Gender */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring[#C1BBEB] focus:border-[#C1BBEB] transition-colors appearance-none bg-white"
                    >
                      <option value=""></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Nationality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.nationality}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors appearance-none bg-white"
                  >
                    <option value=""></option>
                    <option value="Indonesian">Indonesian</option>
                    <option value="American">American</option>
                    <option value="British">British</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mt-6 w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C1BBEB] focus:border-[#C1BBEB] transition-colors resize-none"
                  placeholder="Enter full address"
                />
                <div className="text-right mt-1">
                  <span className="text-xs text-gray-500">
                    {formData.address.length}/500
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-end justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
