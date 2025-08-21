import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageManagement from "../hooks/management";

const BlogPost = () => {
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
            onError={(e) => (e.target.src = "/placeholder-image.jpg")}
          />
        )}

        {/* Blog Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2C473A] mb-6">
          {blog.title}
        </h1>

        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </article>
    </div>
  );
};

export default BlogPost;