import { useEffect, useState } from "react";
import PageManagement from "../../../hooks/management";
import ReviewForm from "./CreateReview";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const REVIEWS_PER_PAGE = 5;

const ViewReview = () => {
  const { getReviews, deleteReview, updateReview } = PageManagement();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  const IMG_URL = import.meta.env.VITE_IMAGE_URL;

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getReviews();
      const reviewList = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];
      setReviews(reviewList);
    } catch (error) {
      toast.error("Failed to load reviews");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      setDeletingId(id);
      await deleteReview(id);
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (error) {
      toast.error(error || "Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    setUpdatingId(id);
    try {
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("featured", currentStatus ? "0" : "1");

      await updateReview(id, formData);
      toast.success("Review featured status updated");
      fetchReviews();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error || "Failed to update review"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Pagination
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Reviews</h2>
        <button
          className="bg-[#2C473A] hover:bg-[#1e3226] text-white px-4 py-2 rounded-md transition"
          onClick={() => {
            setEditingReview(null);
            setShowModal(true);
          }}
        >
          + Add Review
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No reviews found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-3 text-left">Reviewer</th>
                <th className="p-3 text-left">Review</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Featured</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReviews.map((review) => (
                <tr
                  key={review.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{review.reviewer_name}</td>

                  {/* Clamp long review */}
                  <td className="p-3 max-w-xs">
                    <p
                      className="line-clamp-2 text-sm text-gray-700"
                      title={review.review}
                    >
                      {review.review}
                    </p>
                  </td>

                  <td className="p-3">{review.rating}</td>

                  <td className="p-3">
                    <button
                      className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        review.featured ? "bg-green-600" : "bg-gray-300"
                      }`}
                      onClick={() =>
                        handleToggleFeatured(review.id, review.featured)
                      }
                      disabled={updatingId === review.id}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                          review.featured ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>

                  <td className="p-3">
                    {review.image ? (
                      <img
                        src={
                          review.image.startsWith("http")
                            ? review.image
                            : `${IMG_URL}${review.image}`
                        }
                        alt="review"
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setEditingReview(review);
                        setShowModal(true);
                      }}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                      title="Edit Review"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                      disabled={deletingId === review.id}
                      title="Delete Review"
                    >
                      {deletingId === review.id ? (
                        <span className="text-xs">...</span>
                      ) : (
                        <FaTrash size={16} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 rounded ${
                    page === idx + 1
                      ? "bg-[#2C473A] text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <ReviewForm
          isModal={true}
          existingReview={editingReview}
          onClose={() => {
            setShowModal(false);
            setEditingReview(null);
          }}
          fetchReviews={fetchReviews}
        />
      )}
    </div>
  );
};

export default ViewReview;
