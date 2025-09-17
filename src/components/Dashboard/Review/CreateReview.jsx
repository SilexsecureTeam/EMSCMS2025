import { useState, useEffect } from "react";
import PageManagement from "../../../hooks/management";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";

// ✅ Validation schema
const schema = yup.object().shape({
  reviewer_name: yup.string().required("Reviewer name is required"),
  review: yup.string().required("Review is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5")
    .required("Rating is required"),
  featured: yup
    .string()
    .oneOf(["true", "false"], "Featured must be Yes or No")
    .required("Featured field is required"),
});

const ReviewForm = ({
  isModal = false,
  onClose,
  fetchReviews,
  existingReview = null,
}) => {
  const { createReview, updateUserReview } = PageManagement();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserRole = currentUser.role;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reviewer_name: "",
      review: "",
      rating: "",
      image: null,
      featured: true,
    },
  });

  // ✅ For image preview
  const [previewImage, setPreviewImage] = useState(null);

  // ⬇️ Populate form when editing
  useEffect(() => {
    if (existingReview) {
      reset({
        reviewer_name: existingReview.reviewer_name || "",
        review: existingReview.review || "",
        rating: existingReview.rating || "",
        featured: existingReview.featured ? "true" : "false",
      });
      setPreviewImage(
        existingReview?.image?.startsWith("http")
          ? existingReview.image
          : `${import.meta.env.VITE_IMAGE_URL}${existingReview.image}`
      ); // backend should provide image URL
    }
  }, [existingReview, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("reviewer_name", data.reviewer_name);
      formData.append("review", data.review);
      formData.append("rating", data.rating);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (!isModal || currentUserRole !== "user") {
        formData.append("featured", data.featured === "true" ? 1 : 0);
      }

      if (existingReview) {
        formData.append("_method", "PATCH");
        await updateUserReview(existingReview.id, formData);
        toast.success("Review updated successfully");
      } else {
        await createReview(formData);
        toast.success("Review submitted successfully");
      }

      reset();
      setPreviewImage(null);

      if (onClose) {
        fetchReviews();
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Reviewer name */}
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

      {/* Review */}
      <div>
        <label className="block mb-1">Review</label>
        <textarea
          {...register("review")}
          className="w-full border px-3 py-2 rounded"
          rows={5}
          placeholder="Write your review here..."
        />
        {errors.review && (
          <p className="text-red-500 text-sm">{errors.review.message}</p>
        )}
      </div>

      {/* Rating */}
      <div>
        <label className="block mb-1">Rating (1-5)</label>
        <input
          type="number"
          {...register("rating", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
            min: { value: 1, message: "Minimum rating is 1" },
            max: { value: 5, message: "Maximum rating is 5" },
          })}
          min={1}
          max={5}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating.message}</p>
        )}
      </div>

      {/* Image upload + preview */}
      <div>
        <label className="block mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border px-3 py-2 rounded"
          {...register("image", {
            validate: {
              fileSize: (files) =>
                !files[0] ||
                files[0].size <= 2 * 1024 * 1024 ||
                "Image must be less than 2MB",
              fileType: (files) =>
                !files[0] ||
                files[0].type.startsWith("image/") ||
                "Only image files are allowed",
            },
          })}
          onChange={handleImageChange}
        />
        {previewImage && (
          <div className="mt-2">
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      {/* Featured */}
      {(!isModal || currentUserRole !== "user") && (
        <div>
          <label className="block mb-1">Featured</label>
          <select className="w-full p-2" {...register("featured")}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          {errors.featured && (
            <p className="text-red-500 text-sm">{errors.featured.message}</p>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="bg-[#2C473A] text-white px-4 py-2 rounded w-full mt-2 font-semibold hover:bg-[#1e3226]"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? existingReview
            ? "Updating..."
            : "Submitting..."
          : existingReview
          ? "Update Review"
          : "Submit Review"}
      </button>
    </form>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
        <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {existingReview ? "Edit Review" : "Submit Review"}
            </h3>
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <button
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mb-4"
        onClick={() => (window.location.href = "/dashboard/dashboard")}
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold mb-4">
        {existingReview ? "Edit Review" : "Submit Review"}
      </h2>
      {formContent}
    </div>
  );
};

export default ReviewForm;
