import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageManagement from "../../hooks/management";

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2 text-[#2C473A]">{title}</h2>
    <div className="bg-green-50 rounded-lg p-4 text-gray-800">{children}</div>
  </div>
);

const ViewBlog = () => {
  const IMG_URL = import.meta.env.VITE_IMAGE_URL;
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getBlogById } = PageManagement();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const blogData = await getBlogById(slug);
        console.log(blogData)
        setBlog(blogData || null);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  // Format date to a readable format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg font-semibold text-[#2C473A]">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-red-600 font-semibold">Blog not found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-5 py-2 bg-[#2C473A] text-white rounded-lg hover:bg-[#1e3226] transition-colors shadow"
      >
        ← Back to Blogs
      </button>

      {/* Blog Content */}
      <article className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header Image */}
        {blog.image && (
          <img
            src={`${IMG_URL}/${blog.image}`}
            alt={blog.title}
            className="w-full h-64 sm:h-80 object-cover rounded-xl mb-6 border border-gray-200"
            onError={(e) => (e.target.src = "/placeholder-image.jpg")} // Fallback image
          />
        )}

        {/* Blog Title and Metadata */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C473A] mb-3">
            {blog.title}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
            <span className="bg-green-100 px-3 py-1 rounded">
              By {blog.author?.firstname} {blog.author?.lastname}
            </span>
            <span className="bg-green-100 px-3 py-1 rounded">
              Published: {formatDate(blog.created_at)}
            </span>
            <span className="bg-green-100 px-3 py-1 rounded">
              Status: {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
            </span>
            {blog.top_stories === 1 && (
              <span className="bg-yellow-100 px-3 py-1 rounded text-yellow-800">
                Top Story
              </span>
            )}
          </div>
        </div>

        {/* Blog Content */}
        <Section title="Content">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {blog.content}
          </div>
        </Section>

        {/* Additional Metadata */}
        <div className="grid sm:grid-cols-2 gap-6">
          <Section title="Author Details">
            <p>
              <strong>ID:</strong> {blog.author_id}
            </p>
            <p>
              <strong>Name:</strong> {blog.author?.firstname} {blog.author?.lastname}
            </p>
          </Section>
          <Section title="Blog Metadata">
            <p>
              <strong>ID:</strong> {blog.id}
            </p>
            <p>
              <strong>Slug:</strong> {blog.slug}
            </p>
            <p>
              <strong>Last Updated:</strong> {formatDate(blog.updated_at)}
            </p>
            <p>
              <strong>Top Story:</strong> {blog.top_stories === 1 ? "Yes" : "No"}
            </p>
          </Section>
        </div>
      </article>
    </div>
  );
};

export default ViewBlog;