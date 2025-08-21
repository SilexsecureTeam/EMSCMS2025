import React, { useState, useEffect } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PageManagement from "../../hooks/management";

const CreatePage = () => {
  const { createPage } = PageManagement();
  const navigate = useNavigate();

  // State to manage slider image previews
  const [sliderPreviews, setSliderPreviews] = useState([]);
  // State to manage content image previews
  const [contentPreviews, setContentPreviews] = useState([
    null,
    null,
    null,
    null,
  ]);

  const schema = yup.object().shape({
    parent_page: yup.string().required("Parent page is required"),
    sliders: yup
      .mixed()
      .transform((value) => (value instanceof FileList ? Array.from(value) : value))
      .nullable()
      .test("fileSize", "Each image must be less than 10MB", (value) => {
        if (!value || value.length === 0) return true;
        return value.every((file) => file.size <= 10 * 1024 * 1024);
      }),
    header_title: yup.string(),
    header_description: yup.string(),
    title_1: yup.string(),
    content_1: yup.string(),
    content_1_image: yup
      .mixed()
      .nullable()
      .test("fileSize", "Image must be less than 3MB", (value) => {
        if (!value || value.length === 0) return true;
        return value[0].size <= 3 * 1024 * 1024;
      }),
    title_2: yup.string().nullable(),
    content_2: yup.string().nullable(),
    content_2_image: yup
      .mixed()
      .nullable()
      .test("fileSize", "Image must be less than 3MB", (value) => {
        if (!value || value.length === 0) return true;
        return value[0].size <= 3 * 1024 * 1024;
      }),
    title_3: yup.string().nullable(),
    content_3: yup.string().nullable(),
    content_3_image: yup
      .mixed()
      .nullable()
      .test("fileSize", "Image must be less than 3MB", (value) => {
        if (!value || value.length === 0) return true;
        return value[0].size <= 3 * 1024 * 1024;
      }),
    title_4: yup.string().nullable(),
    content_4: yup.string().nullable(),
    content_4_image: yup
      .mixed()
      .nullable()
      .test("fileSize", "Image must be less than 3MB", (value) => {
        if (!value || value.length === 0) return true;
        return value[0].size <= 3 * 1024 * 1024;
      }),
    green_title: yup.string(),
    green_description: yup.string(),
    footer_title: yup.string(),
    footer_contact: yup.string().email("Invalid email address"),
    footer_description: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      parent_page: "",
      sliders: null,
      header_title: "",
      header_description: "",
      title_1: "",
      content_1: "",
      content_1_image: null,
      title_2: "",
      content_2: "",
      content_2_image: null,
      title_3: "",
      content_3: "",
      content_3_image: null,
      title_4: "",
      content_4: "",
      content_4_image: null,
      green_title: "",
      green_description: "",
      footer_title: "",
      footer_contact: "",
      footer_description: "",
    },
  });

  const sliders = watch("sliders");
  const content1Image = watch("content_1_image");
  const content2Image = watch("content_2_image");
  const content3Image = watch("content_3_image");
  const content4Image = watch("content_4_image");

  // Effect to handle slider image previews
  useEffect(() => {
    if (sliders && sliders.length > 0) {
      const urls = Array.from(sliders).map((file) => URL.createObjectURL(file));
      setSliderPreviews(urls);
    } else {
      setSliderPreviews([]);
    }
  }, [sliders]);

  // Effect to handle content image previews
  useEffect(() => {
    const newPreviews = [
      content1Image?.[0] || null,
      content2Image?.[0] || null,
      content3Image?.[0] || null,
      content4Image?.[0] || null,
    ].map((file) => (file ? URL.createObjectURL(file) : null));

    setContentPreviews(newPreviews);

    // Cleanup function to revoke object URLs
    return () => {
      newPreviews.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [content1Image, content2Image, content3Image, content4Image]);

  const removeSliderImage = (index) => {
    const currentFiles = [...(watch("sliders") || [])];
    currentFiles.splice(index, 1);
    setValue("sliders", currentFiles, { shouldValidate: true });
  };

  const removeContentImage = (index) => {
    const fieldName = `content_${index + 1}_image`;
    setValue(fieldName, null, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("parent_page", data.parent_page);
    if (data.sliders && data.sliders.length > 0) {
      Array.from(data.sliders).forEach((file) => {
        formData.append("sliders[]", file);
      });
    }
    formData.append("header_title", data.header_title);
    formData.append("header_description", data.header_description);
    formData.append("title_1", data.title_1);
    formData.append("content_1", data.content_1);
    if (data.content_1_image && data.content_1_image.length > 0) {
      formData.append("content_1_image", data.content_1_image[0]);
    }
    if (data.title_2) formData.append("title_2", data.title_2);
    if (data.content_2) formData.append("content_2", data.content_2);
    if (data.content_2_image && data.content_2_image.length > 0) {
      formData.append("content_2_image", data.content_2_image[0]);
    }
    if (data.title_3) formData.append("title_3", data.title_3);
    if (data.content_3) formData.append("content_3", data.content_3);
    if (data.content_3_image && data.content_3_image.length > 0) {
      formData.append("content_3_image", data.content_3_image[0]);
    }
    if (data.title_4) formData.append("title_4", data.title_4);
    if (data.content_4) formData.append("content_4", data.content_4);
    if (data.content_4_image && data.content_4_image.length > 0) {
      formData.append("content_4_image", data.content_4_image[0]);
    }
    formData.append("green_title", data.green_title);
    formData.append("green_description", data.green_description);
    formData.append("footer_title", data.footer_title);
    formData.append("footer_contact", data.footer_contact);
    formData.append("footer_description", data.footer_description);

    try {
      await toast.promise(createPage(formData), {
        pending: "Creating page...",
        success: "Page created successfully",
        error: (error) => error.response?.data?.message || "Failed to create page",
      });
      reset();
      navigate("/dashboard/pages");
    } catch (error) {
      console.error("Error creating page:", error);
      toast.error(error.response?.data?.message || "Failed to create page");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#2B2D42]">
          Create New Page
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Parent Page */}
          <div className="space-y-2 border p-4 rounded bg-white">
            <label className="block font-light text-[18px]">
              Parent Page
            </label>
            <input
              type="text"
              placeholder="Enter parent page (e.g., about, home, blog)"
              {...register("parent_page")}
              className="w-full border-b p-2 text-lg font-medium outline-none"
            />
            {errors.parent_page && (
              <p className="text-red-500 text-sm">
                {errors.parent_page.message}
              </p>
            )}
          </div>

          {/* Slider Images */}
          <div className="space-y-2 border p-4 rounded bg-white">
            <label className="block font-light text-[18px]">
              Upload Slider Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("sliders")}
              className="bg-white p-2 rounded"
            />
            {errors.sliders && (
              <p className="text-red-500 text-sm">{errors.sliders.message}</p>
            )}
            {sliderPreviews.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-2">
                {sliderPreviews.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Slider ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeSliderImage(index)}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                    >
                      <XCircleIcon size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Header Section */}
          <div className="space-y-2 border p-4 rounded bg-white">
            <label className="block font-light text-[18px]">
              Header Title
            </label>
            <input
              type="text"
              placeholder="Enter header title"
              {...register("header_title")}
              className="w-full border-b p-2 text-lg font-medium outline-none"
            />
            {errors.header_title && (
              <p className="text-red-500 text-sm">
                {errors.header_title.message}
              </p>
            )}
            <label className="block font-light text-[18px] mt-4">
              Header Description
            </label>
            <div className="border rounded bg-[#2C473A] text-white flex items-center p-1 gap-1">
              <select className="border rounded p-1 text-sm bg-white text-black">
                <option>Normal</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
              </select>
              <button className="p-1 hover:bg-gray-100 rounded font-bold">
                B
              </button>
              <button className="p-1 hover:bg-gray-100 rounded italic">
                I
              </button>
              <button className="p-1 hover:bg-gray-100 rounded underline">
                U
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">S</button>
              <button className="p-1 hover:bg-gray-100 rounded">"</button>
              <div className="h-5 w-px bg-gray-300 mx-1"></div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 4H4v4h4V4z" fill="currentColor" />
                  <path d="M4 11h4v4H4v-4z" fill="currentColor" />
                  <path d="M4 18h4v4H4v-4z" fill="currentColor" />
                  <path d="M11 4h12v4H11V4z" fill="currentColor" />
                  <path d="M11 11h12v4H11v-4z" fill="currentColor" />
                  <path d="M11 18h12v4H11v-4z" fill="currentColor" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4h4v4H4V4z" fill="currentColor" />
                  <path d="M11 4h12v4H11V4z" fill="currentColor" />
                  <path d="M4 11h4v4H4v-4z" fill="currentColor" />
                  <path d="M11 11h12v4H11v-4z" fill="currentColor" />
                  <path d="M4 18h4v4H4v-4z" fill="currentColor" />
                  <path d="M11 18h12v4H11v-4z" fill="currentColor" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 6h16v2H4V6z" fill="currentColor" />
                  <path d="M4 11h16v2H4v-2z" fill="currentColor" />
                  <path d="M4 16h16v2H4v-2z" fill="currentColor" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 6h16v2H4V6z" fill="currentColor" />
                  <path d="M8 11h12v2H8v-2z" fill="currentColor" />
                  <path d="M4 16h16v2H4v-2z" fill="currentColor" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 7h10v2H9V7z" fill="currentColor" />
                  <path d="M6 7H4v10h2V7z" fill="currentColor" />
                  <path d="M9 15h10v2H9v-2z" fill="currentColor" />
                  <path d="M6 15h2v2H6v-2z" fill="currentColor" />
                  <path d="M6 7h2v2H6V7z" fill="currentColor" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 8L3 12l4 4V8z" fill="currentColor" />
                  <path d="M17 8l4 4-4 4V8z" fill="currentColor" />
                  <path d="M14 4l-4 16" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <textarea
              placeholder="Enter header description"
              {...register("header_description")}
              className="w-full border p-2 rounded h-32 resize-none"
            />
            {errors.header_description && (
              <p className="text-red-500 text-sm">
                {errors.header_description.message}
              </p>
            )}
          </div>

          {/* Content Sections */}
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="space-y-2 border p-4 rounded bg-white">
              <label className="block font-light text-[18px]">
                Title {idx + 1}
              </label>
              <input
                type="text"
                placeholder={`Enter title ${idx + 1}`}
                {...register(`title_${idx + 1}`)}
                className="w-full border-b p-2 text-lg font-medium outline-none"
              />
              {errors[`title_${idx + 1}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`title_${idx + 1}`].message}
                </p>
              )}
              <label className="block font-light text-[18px] mt-4">
                Content {idx + 1}
              </label>
              <div className="border rounded bg-[#2C473A] text-white flex items-center p-1 gap-1">
                <select className="border rounded p-1 text-sm bg-white text-black">
                  <option>Normal</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                </select>
                <button className="p-1 hover:bg-gray-100 rounded font-bold">
                  B
                </button>
                <button className="p-1 hover:bg-gray-100 rounded italic">
                  I
                </button>
                <button className="p-1 hover:bg-gray-100 rounded underline">
                  U
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">S</button>
                <button className="p-1 hover:bg-gray-100 rounded">"</button>
                <div className="h-5 w-px bg-gray-300 mx-1"></div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 4H4v4h4V4z" fill="currentColor" />
                    <path d="M4 11h4v4H4v-4z" fill="currentColor" />
                    <path d="M4 18h4v4H4v-4z" fill="currentColor" />
                    <path d="M11 4h12v4H11V4z" fill="currentColor" />
                    <path d="M11 11h12v4H11v-4z" fill="currentColor" />
                    <path d="M11 18h12v4H11v-4z" fill="currentColor" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 4h4v4H4V4z" fill="currentColor" />
                    <path d="M11 4h12v4H11V4z" fill="currentColor" />
                    <path d="M4 11h4v4H4v-4z" fill="currentColor" />
                    <path d="M11 11h12v4H11v-4z" fill="currentColor" />
                    <path d="M4 18h4v4H4v-4z" fill="currentColor" />
                    <path d="M11 18h12v4H11v-4z" fill="currentColor" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6h16v2H4V6z" fill="currentColor" />
                    <path d="M4 11h16v2H4v-2z" fill="currentColor" />
                    <path d="M4 16h16v2H4v-2z" fill="currentColor" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6h16v2H4V6z" fill="currentColor" />
                    <path d="M8 11h12v2H8v-2z" fill="currentColor" />
                    <path d="M4 16h16v2H4v-2z" fill="currentColor" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 7h10v2H9V7z" fill="currentColor" />
                    <path d="M6 7H4v10h2V7z" fill="currentColor" />
                    <path d="M9 15h10v2H9v-2z" fill="currentColor" />
                    <path d="M6 15h2v2H6v-2z" fill="currentColor" />
                    <path d="M6 7h2v2H6V7z" fill="currentColor" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 8L3 12l4 4V8z" fill="currentColor" />
                    <path d="M17 8l4 4-4 4V8z" fill="currentColor" />
                    <path d="M14 4l-4 16" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
              <textarea
                placeholder={`Enter content ${idx + 1}`}
                {...register(`content_${idx + 1}`)}
                className="w-full border p-2 rounded h-32 resize-none"
              />
              {errors[`content_${idx + 1}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`content_${idx + 1}`].message}
                </p>
              )}
              <label className="block font-light text-[18px] mt-4">
                Content Image {idx + 1}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  {...register(`content_${idx + 1}_image`)}
                  className="flex-1 bg-white p-2 rounded"
                />
                {contentPreviews[idx] ? (
                  <div className="bg-[#C5AC8E] px-3 py-2 text-white h-fit text-[16px]">Attached</div>
                ) : (
                  <div className="bg-[#C5AC8E] px-3 py-2 text-white h-fit text-[16px]">Not Attached</div>
                )}
              </div>
              {contentPreviews[idx] ? (
                <div className="relative w-24 h-24 mt-2">
                  <img
                    src={contentPreviews[idx]}
                    alt={`Content ${idx + 1} Image`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeContentImage(idx)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                  >
                    <XCircleIcon size={18} />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded mt-2">
                  <span className="text-sm text-gray-500">
                    Set content image
                  </span>
                </div>
              )}
              {errors[`content_${idx + 1}_image`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`content_${idx + 1}_image`].message}
                </p>
              )}
            </div>
          ))}

          {/* Green and Footer Section */}
          <div className="space-y-2 border p-4 rounded bg-white">
            <div className="w-full bg-[#10172B] mb-4 p-3 pl-7 text-white">
              Green and Footer Details
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex gap-x-1 items-center">
                    <PlusIcon className="w-5 h-5 bg-[#C5AC8E] rounded-full p-1 text-white cursor-pointer" />
                    <label className="font-light text-[16px] underline">
                      Green Title
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter green title"
                    {...register("green_title")}
                    className="w-full pl-3 p-2 rounded mt-1 text-[#424541] bg-[#C5AC8E]"
                  />
                  {errors.green_title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.green_title.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex gap-x-1 items-center">
                    <PlusIcon className="w-5 h-5 bg-[#C5AC8E] rounded-full p-1 text-white cursor-pointer" />
                    <label className="font-light text-[16px] underline">
                      Footer Contact Email
                    </label>
                  </div>
                  <input
                    type="email"
                    placeholder="Enter footer contact email"
                    {...register("footer_contact")}
                    className="w-full pl-3 p-2 rounded mt-1 text-[#424541] bg-[#C5AC8E]"
                  />
                  {errors.footer_contact && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.footer_contact.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex gap-x-1 items-center">
                  <PlusIcon className="w-5 h-5 bg-[#C5AC8E] rounded-full p-1 text-white cursor-pointer" />
                  <label className="font-light text-[16px] underline">
                    Green Description
                  </label>
                </div>
                <textarea
                  placeholder="Enter green description"
                  {...register("green_description")}
                  className="w-full pl-3 p-2 rounded mt-1 text-[#424541] bg-[#C5AC8E] h-24 resize-none"
                />
                {errors.green_description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.green_description.message}
                  </p>
                )}
              </div>
              <div>
                <div className="flex gap-x-1 items-center">
                  <PlusIcon className="w-5 h-5 bg-[#C5AC8E] rounded-full p-1 text-white cursor-pointer" />
                  <label className="font-light text-[16px] underline">
                    Footer Title
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Enter footer title"
                  {...register("footer_title")}
                  className="w-full pl-3 p-2 rounded mt-1 text-[#424541] bg-[#C5AC8E]"
                />
                {errors.footer_title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.footer_title.message}
                  </p>
                )}
              </div>
              <div>
                <div className="flex gap-x-1 items-center">
                  <PlusIcon className="w-5 h-5 bg-[#C5AC8E] rounded-full p-1 text-white cursor-pointer" />
                  <label className="font-light text-[16px] underline">
                    Footer Description
                  </label>
                </div>
                <textarea
                  placeholder="Enter footer description"
                  {...register("footer_description")}
                  className="w-full pl-3 p-2 rounded mt-1 text-[#424541] bg-[#C5AC8E] h-24 resize-none"
                />
                {errors.footer_description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.footer_description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto py-2 bg-[#0B1B2B] text-white rounded shadow-md disabled:opacity-50"
            >
              Create Page
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/pages")}
              className="w-full sm:w-auto py-2 border rounded text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;