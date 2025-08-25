import React, { useEffect, useState } from "react";
import { XCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import PageManagement from "../../hooks/management";

const schema = yup.object().shape({
  parent_page: yup.string().required("Parent page is required"),
  sliders: yup
    .mixed()
    .transform((value) => (value instanceof FileList ? Array.from(value) : value))
    .nullable(),
  header_title: yup.string(),
  header_description: yup.string(),
  title_1: yup.string(),
  content_1: yup.string(),
  content_1_image: yup.mixed().nullable(),
  title_2: yup.string().nullable(),
  content_2: yup.string().nullable(),
  content_2_image: yup.mixed().nullable(),
  title_3: yup.string().nullable(),
  content_3: yup.string().nullable(),
  content_3_image: yup.mixed().nullable(),
  title_4: yup.string().nullable(),
  content_4: yup.string().nullable(),
  content_4_image: yup.mixed().nullable(),
  green_title: yup.string(),
  green_description: yup.string(),
  footer_title: yup.string(),
  footer_contact: yup.string().email("Invalid email address"),
  footer_description: yup.string(),
});

const EditPageModal = ({ page, onClose, onSuccess }) => {
  const { createPage } = PageManagement();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Previews for slider images
  const [sliderPreviews, setSliderPreviews] = useState(
    Array.isArray(page.sliders) ? page.sliders : []
  );
  // Previews for content images
  const [contentPreviews, setContentPreviews] = useState([
    page.content_1_image || null,
    page.content_2_image || null,
    page.content_3_image || null,
    page.content_4_image || null,
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      parent_page: page.parent_page || "",
      sliders: null,
      header_title: page.header_title || "",
      header_description: page.header_description || "",
      title_1: page.title_1 || "",
      content_1: page.content_1 || "",
      content_1_image: null,
      title_2: page.title_2 || "",
      content_2: page.content_2 || "",
      content_2_image: null,
      title_3: page.title_3 || "",
      content_3: page.content_3 || "",
      content_3_image: null,
      title_4: page.title_4 || "",
      content_4: page.content_4 || "",
      content_4_image: null,
      green_title: page.green_title || "",
      green_description: page.green_description || "",
      footer_title: page.footer_title || "",
      footer_contact: page.footer_contact || "",
      footer_description: page.footer_description || "",
    },
  });

  const sliders = watch("sliders");
  const content1Image = watch("content_1_image");
  const content2Image = watch("content_2_image");
  const content3Image = watch("content_3_image");
  const content4Image = watch("content_4_image");

  // Slider image previews
  useEffect(() => {
    if (sliders && sliders.length > 0) {
      const urls = Array.from(sliders).map((file) => URL.createObjectURL(file));
      setSliderPreviews(urls);
    } else if (Array.isArray(page.sliders)) {
      setSliderPreviews(page.sliders);
    } else {
      setSliderPreviews([]);
    }
  }, [sliders, page.sliders]);

  // Content image previews
  useEffect(() => {
    const newPreviews = [
      content1Image?.[0] || null,
      content2Image?.[0] || null,
      content3Image?.[0] || null,
      content4Image?.[0] || null,
    ].map((file, idx) =>
      file ? URL.createObjectURL(file) : page[`content_${idx + 1}_image`] || null
    );
    setContentPreviews(newPreviews);

    return () => {
      newPreviews.forEach((url, idx) => {
        if (url && url !== page[`content_${idx + 1}_image`]) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [content1Image, content2Image, content3Image, content4Image, page]);

  const removeSliderImage = (index) => {
    const currentFiles = [...(watch("sliders") || [])];
    currentFiles.splice(index, 1);
    setValue("sliders", currentFiles, { shouldValidate: true });
    setSliderPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeContentImage = (index) => {
    const fieldName = `content_${index + 1}_image`;
    setValue(fieldName, null, { shouldValidate: true });
    setContentPreviews((prev) => {
      const arr = [...prev];
      arr[index] = null;
      return arr;
    });
  };

  useEffect(() => {
    reset({
      parent_page: page.parent_page || "",
      sliders: null,
      header_title: page.header_title || "",
      header_description: page.header_description || "",
      title_1: page.title_1 || "",
      content_1: page.content_1 || "",
      content_1_image: null,
      title_2: page.title_2 || "",
      content_2: page.content_2 || "",
      content_2_image: null,
      title_3: page.title_3 || "",
      content_3: page.content_3 || "",
      content_3_image: null,
      title_4: page.title_4 || "",
      content_4: page.content_4 || "",
      content_4_image: null,
      green_title: page.green_title || "",
      green_description: page.green_description || "",
      footer_title: page.footer_title || "",
      footer_contact: page.footer_contact || "",
      footer_description: page.footer_description || "",
    });
  }, [page, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("id", page.id);
      formData.append("parent_page", data.parent_page);

      // Slider images
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
      formData.append("title_2", data.title_2);
      formData.append("content_2", data.content_2);
      if (data.content_2_image && data.content_2_image.length > 0) {
        formData.append("content_2_image", data.content_2_image[0]);
      }
      formData.append("title_3", data.title_3);
      formData.append("content_3", data.content_3);
      if (data.content_3_image && data.content_3_image.length > 0) {
        formData.append("content_3_image", data.content_3_image[0]);
      }
      formData.append("title_4", data.title_4);
      formData.append("content_4", data.content_4);
      if (data.content_4_image && data.content_4_image.length > 0) {
        formData.append("content_4_image", data.content_4_image[0]);
      }
      formData.append("green_title", data.green_title);
      formData.append("green_description", data.green_description);
      formData.append("footer_title", data.footer_title);
      formData.append("footer_contact", data.footer_contact);
      formData.append("footer_description", data.footer_description);

      await toast.promise(createPage(formData), {
        pending: "Updating page...",
        success: "Page updated successfully",
        error: (error) => error.response?.data?.message || "Failed to update page",
      });
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update page");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#2B2D42]">Edit Page</h3>
          <button onClick={onClose} className="text-[#060a18b9] hover:text-[#060a18]">
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Parent Page */}
          <div>
            <label className="block font-light text-[18px]">Parent Page</label>
            <input
              type="text"
              {...register("parent_page")}
              className="w-full border-b p-2 text-lg font-medium outline-none"
            />
            {errors.parent_page && (
              <p className="text-red-500 text-sm">{errors.parent_page.message}</p>
            )}
          </div>

          {/* Slider Images */}
          <div>
            <label className="block font-light text-[18px]">Slider Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("sliders")}
              className="bg-white p-2 rounded"
            />
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
          <div>
            <label className="block font-light text-[18px]">Header Title</label>
            <input
              type="text"
              {...register("header_title")}
              className="w-full border-b p-2 text-lg font-medium outline-none"
            />
            {errors.header_title && (
              <p className="text-red-500 text-sm">{errors.header_title.message}</p>
            )}
          </div>
          <div>
            <label className="block font-light text-[18px]">Header Description</label>
            <div className="border rounded bg-[#2C473A] text-white flex items-center p-1 gap-1">
              <select className="border rounded p-1 text-sm bg-white text-black">
                <option>Normal</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
              </select>
              <button className="p-1 hover:bg-gray-100 rounded font-bold">B</button>
              <button className="p-1 hover:bg-gray-100 rounded italic">I</button>
              <button className="p-1 hover:bg-gray-100 rounded underline">U</button>
              <button className="p-1 hover:bg-gray-100 rounded">S</button>
              <button className="p-1 hover:bg-gray-100 rounded">"</button>
              <div className="h-5 w-px bg-gray-300 mx-1"></div>
              {/* Add more toolbar buttons as needed */}
            </div>
            <textarea
              {...register("header_description")}
              className="w-full border p-2 rounded h-32 resize-none"
            />
            {errors.header_description && (
              <p className="text-red-500 text-sm">{errors.header_description.message}</p>
            )}
          </div>

          {/* Content Sections */}
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx}>
              <label className="block font-light text-[18px]">Title {idx + 1}</label>
              <input
                type="text"
                {...register(`title_${idx + 1}`)}
                className="w-full border-b p-2 text-lg font-medium outline-none"
              />
              <label className="block font-light text-[18px] mt-2">Content {idx + 1}</label>
              <div className="border rounded bg-[#2C473A] text-white flex items-center p-1 gap-1">
                <select className="border rounded p-1 text-sm bg-white text-black">
                  <option>Normal</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                </select>
                <button className="p-1 hover:bg-gray-100 rounded font-bold">B</button>
                <button className="p-1 hover:bg-gray-100 rounded italic">I</button>
                <button className="p-1 hover:bg-gray-100 rounded underline">U</button>
                <button className="p-1 hover:bg-gray-100 rounded">S</button>
                <button className="p-1 hover:bg-gray-100 rounded">"</button>
                <div className="h-5 w-px bg-gray-300 mx-1"></div>
                {/* Add more toolbar buttons as needed */}
              </div>
              <textarea
                {...register(`content_${idx + 1}`)}
                className="w-full border p-2 rounded h-32 resize-none"
              />
              {errors[`content_${idx + 1}`] && (
                <p className="text-red-500 text-sm">{errors[`content_${idx + 1}`].message}</p>
              )}
              <label className="block font-light text-[18px] mt-4">Content Image {idx + 1}</label>
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
          <div>
            <label className="block font-light text-[18px]">Green Title</label>
            <input
              type="text"
              {...register("green_title")}
              className="w-full border-b p-2 text-lg font-medium outline-none"
            />
            {errors.green_title && (
              <p className="text-red-500 text-sm">{errors.green_title.message}</p>
            )}
          </div>
          <div>
            <label className="block font-light text-[18px]">Green Description</label>
            <textarea
              {...register("green_description")}
              className="w-full border p-2 rounded h-24 resize-none"
            />
            {errors.green_description && (
              <p className="text-red-500 text-sm">{errors.green_description.message}</p>
            )}
          </div>
          <div>
            <label className="block font-light text-[18px]">Footer Title</label>
            <input
              type="text"
              {...register("footer_title")}
              className="w-full border-b p-2 text-lg font-medium outline-none"
            />
            {errors.footer_title && (
              <p className="text-red-500 text-sm">{errors.footer_title.message}</p>
            )}
          </div>
          <div>
            <label className="block font-light text-[18px]">Footer Contact Email</label>
            <input
              type="email"
              {...register("footer_contact")}
              className="w-full border-b p-2 text-lg font-medium outline-none"
            />
            {errors.footer_contact && (
              <p className="text-red-500 text-sm">{errors.footer_contact.message}</p>
            )}
          </div>
          <div>
            <label className="block font-light text-[18px]">Footer Description</label>
            <textarea
              {...register("footer_description")}
              className="w-full border p-2 rounded h-24 resize-none"
            />
            {errors.footer_description && (
              <p className="text-red-500 text-sm">{errors.footer_description.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-[#0B1B2B] text-white rounded shadow-md disabled:opacity-50 mt-4"
          >
            {isSubmitting ? "Updating..." : "Update Page"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPageModal;