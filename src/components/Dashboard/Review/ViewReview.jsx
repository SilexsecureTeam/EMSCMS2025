import { useEffect, useState } from "react";
import PageManagement from "../../../hooks/management";
import ReviewForm from "./CreateReview";
import { toast } from "react-hot-toast";

const REVIEWS_PER_PAGE = 5;

const ViewReview = () => {
    const { getReviews, deleteReview, updateReview } = PageManagement();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [page, setPage] = useState(1);
    const IMG_URL = import.meta.env.VITE_IMAGE_URL;

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await getReviews();
            console.log(response)
            const reviewList = Array.isArray(response)
                ? response
                : response?.data && Array.isArray(response.data)
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
            await deleteReview(id);
            toast.success("Review deleted successfully");
            fetchReviews();
        } catch (error) {
            toast.error(error || "Failed to delete review");
        }
    };

    const handleToggleFeatured = async (id, currentStatus) => {
        setUpdatingId(id);
        try {
            const formData = new FormData();
            formData.append("_method", "PATCH");
            const newStatus = currentStatus ? 0 : 1;
            formData.append("featured", newStatus.toString()); 
            console.log('Updating review:', id, 'from', currentStatus, 'to', newStatus);
            
            await updateReview(id, formData);
            toast.success("Review featured status updated");
            fetchReviews();
        } catch (error) {
            console.error('Toggle error:', error);
            toast.error(error?.response?.data?.message || error || "Failed to update review");
        } finally {
            setUpdatingId(null);
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
    const paginatedReviews = reviews.slice(
        (page - 1) * REVIEWS_PER_PAGE,
        page * REVIEWS_PER_PAGE
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
            <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mb-4"
                onClick={() => window.location.href = "/dashboard/dashboard"}
            >
                &larr; Back
            </button>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">All Reviews</h2>
                <button
                    className="bg-[#2C473A] text-white px-4 py-2 rounded"
                    onClick={() => setShowModal(true)}
                >
                    Add Review
                </button>
            </div>
            {loading ? (
                <div>Loading...</div>
                
            ) : reviews.length === 0 ? (
                <div>No reviews found.</div>
            ) : (
                <>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left">Reviewer</th>
                                <th className="p-3 text-left">Review</th>
                                <th className="p-3 text-left">Rating</th>
                                <th className="p-3 text-left">Featured</th>
                                <th className="p-3 text-left">Image</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedReviews.map((review, idx) => (
                                <tr key={review.id || idx} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{review.reviewer_name || "-"}</td>
                                    <td className="p-3">{review.review || "-"}</td>
                                    <td className="p-3">{review.rating || "-"}</td>
                                    <td className="p-3">
                                        <button
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                                                review.featured ? "bg-green-600" : "bg-gray-200"
                                            }`}
                                            onClick={() => handleToggleFeatured(review.id, review.featured)}
                                            disabled={updatingId === review.id}
                                        >
                                            <span
                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                                    review.featured ? "translate-x-5" : "translate-x-0"
                                                }`}
                                            />
                                        </button>
                                        <span className="ml-2 text-sm text-gray-500">
                                            {updatingId === review.id
                                                ? "Updating..."
                                                : review.featured
                                                    ? "Featured"
                                                    : "Not Featured"}
                                        </span>
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
                                                className="h-10 w-10 object-cover rounded"
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => handleDelete(review.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-6 gap-2">
                            <button
                                className="px-3 py-1 rounded bg-gray-200 text-gray-800"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                Prev
                            </button>
                            {[...Array(totalPages)].map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`px-3 py-1 rounded ${page === idx + 1 ? "bg-[#2C473A] text-white" : "bg-gray-200 text-gray-800"}`}
                                    onClick={() => setPage(idx + 1)}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                            <button
                                className="px-3 py-1 rounded bg-gray-200 text-gray-800"
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Review Modal */}
            {showModal && (
                <ReviewForm
                    isModal={true}
                    onClose={() => {
                        setShowModal(false);
                        fetchReviews();
                    }}
                />
            )}
        </div>
    );
};

export default ViewReview;