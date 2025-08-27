import { useState } from "react";
import PageManagement from "../../../hooks/management";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";

// Editor Toolbar Component (same as AddProgramPage)
const EditorToolbar = () => (
  <div className="border rounded bg-[#2C473A] text-white flex items-center p-1 gap-1 mb-2">
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
);

// Validation schema
const schema = yup.object().shape({
  reviewer_name: yup.string().required("Reviewer name is required"),
  review: yup.string().required("Review is required"),
  rating: yup.number().min(1).max(5).required("Rating is required"),
  image: yup
    .mixed()
    .test("fileSize", "Image must be less than 2MB", value => {
      if (!value || !value[0]) return true;
      return value[0].size <= 2 * 1024 * 1024;
    })
    .nullable(),
  featured: yup.boolean(),
});

const ReviewForm = ({ isModal = false, onClose }) => {
  const { createReview } = PageManagement();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserRole = currentUser.role;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reviewer_name: "",
      review: "",
      rating: "",
      image: null,
      featured: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("reviewer_name", data.reviewer_name);
      formData.append("review", data.review);
      formData.append("rating", data.rating);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      // Only add featured if visible
      if (!isModal || currentUserRole !== "user") {
        formData.append("featured", data.featured ? 1 : 0);
      }
      await createReview(formData);
      toast.success("Review submitted successfully");
      reset();
      if (onClose) onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to submit review"
      );
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Reviewer Name</label>
        <input
          type="text"
          {...register("reviewer_name")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.reviewer_name && (
          <p className="text-red-500 text-sm">{errors.reviewer_name.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1">Review</label>
        <EditorToolbar />
        <Controller
          name="review"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full border px-3 py-2 rounded"
              rows={5}
              placeholder="Write your review here..."
            />
          )}
        />
        {errors.review && (
          <p className="text-red-500 text-sm">{errors.review.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1">Rating (1-5)</label>
        <input
          type="number"
          {...register("rating")}
          min={1}
          max={5}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1">Image</label>
        <input
          type="file"
          {...register("image")}
          accept="image/*"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>
      {/* Only show featured if not modal or not user */}
      {(!isModal || currentUserRole !== "user") && (
        <div>
          <label className="block mb-1">Featured</label>
          <select {...register("featured")} className="w-full border px-3 py-2 rounded">
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
          {errors.featured && (
            <p className="text-red-500 text-sm">{errors.featured.message}</p>
          )}
        </div>
      )}
      <button
        type="submit"
        className="bg-[#2C473A] text-white px-4 py-2 rounded w-full mt-2 font-semibold hover:bg-[#1e3226]"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
        <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Submit Review</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <span className="text-xl">&times;</span>
            </button>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  // Normal page form
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <button
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mb-4"
        onClick={() => window.location.href = "/dashboard/dashboard"}
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Submit Review</h2>
      {formContent}
    </div>
  );
};

export default ReviewForm;