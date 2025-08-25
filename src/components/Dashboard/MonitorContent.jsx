import React, { useEffect, useState } from 'react';
import { EyeIcon, FilePlus, X } from 'lucide-react';
import PageManagement from '../../hooks/management';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const MonitorContent = () => {
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const { createBlogs, getAllBlogs, deleteBlogs, updateBlogs, getBlogById } = PageManagement();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const IMG_URL = import.meta.env.VITE_IMAGE_URL;

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    status: yup.string().oneOf(['draft', 'published'], 'Invalid status').required('Status is required'),
    top_stories: yup.boolean(),
    image: yup
      .mixed()
      .nullable()
      .test('fileSize', 'Image must be less than 2MB', value => {
        if (!value || value.length === 0) return true;
        return value[0].size <= 2 * 1024 * 1024;
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      content: '',
      status: 'draft',
      top_stories: false,
    },
  });

  const handleViewBlog = (slug) => {
    window.location.href = `/dashboard/blog/${slug}`;
  };

  const handleEditClick = async (slug) => {
    try {
      const blog = await getBlogById(slug);
      if (!blog) {
        toast.error('Blog not found');
        return;
      }
      setValue('title', blog.title || '');
      setValue('content', blog.content || '');
      setValue('status', blog.status || 'draft');
      setValue('top_stories', blog.top_stories === 1 || blog.top_stories === true);
      setCurrentImage(blog.image);
      setSelectedCategoryId(blog.id);
      setShowEditCategoryModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load blog details');
    }
  };

  const editCategory = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('status', data.status);
    formData.append('top_stories', data.top_stories ? 1 : 0);
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }
    formData.append("_method", "PATCH");
    try {
      await toast.promise(
        updateBlogs(selectedCategoryId, formData),
        {
          pending: 'Updating post...',
          success: 'Post updated successfully',
          error: (error) => error.response?.data?.message || 'Failed to update post',
        }
      );
      const updated = await getAllBlogs();
      setCategories(updated || []);
      reset();
      setShowEditCategoryModal(false);
      setSelectedCategoryId(null);
      setCurrentImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update post');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await toast.promise(deleteBlogs(id), {
        pending: 'Deleting blog...',
        success: 'Blog deleted successfully',
        error: (error) => error.response?.data?.message || 'Failed to delete blog',
      });
      const updated = await getAllBlogs();
      setCategories(updated || []);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getAllBlogs();
        setCategories(data || []);
      } catch (error) {
        toast.error('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCreatePost = async (data) => {
    const formData = new FormData();
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('status', data.status);
    formData.append('top_stories', data.top_stories ? '1' : '0');

    try {
      await toast.promise(createBlogs(formData), {
        pending: 'Creating post...',
        success: 'Post created successfully',
        error: (error) => error.response?.data?.message || 'Failed to create post',
      });

      const updated = await getAllBlogs();
      setCategories(updated || []);
      reset();
      setShowAddCategoryModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    }
  };

  // Editor toolbar JSX
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

  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="p-4 bg-white rounded-xl shadow sm:p-6">
        <div className="flex flex-col justify-between items-start mb-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold text-[#252B42] sm:text-2xl">Blog Categories</h2>
          <button
            onClick={() => {
              reset();
              setShowAddCategoryModal(true);
            }}
            className="mt-2 bg-[#2C473A] text-white cursor-pointer px-4 py-2 rounded-sm hover:bg-green-700 sm:mt-0"
          >
            + Add Blog Post
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-green-50 rounded overflow-hidden">
            <thead className="bg-[#10172B] text-white font-medium text-sm sm:text-base text-left">
              <tr>
                <th className="px-2 py-2 sm:px-4">Title</th>
                <th className="px-2 py-2 sm:px-4">Image</th>
                <th className="px-2 py-2 sm:px-4">Content</th>
                <th className="px-4 py-2 text-right sm:px-8">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">Loading...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">No categories found</td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="border-b">
                    <td className="px-2 py-2 sm:px-4">{cat.title}</td>
                    <td className="px-2 py-2 sm:px-4">
                      {cat.image ? (
                        <img
                          src={`${IMG_URL}${cat.image}`}
                          alt={cat.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td className="px-2 py-2 sm:px-4">{cat.content.length > 30 ? `${cat.content.slice(0, 30)}...` : cat.content}</td>
                    <td className="px-4 py-2 flex gap-x-2 justify-end">
                      <button
                        onClick={() => handleEditClick(cat.slug)}
                        className="text-purple-600 hover:scale-110"
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleViewBlog(cat.slug)}
                        className="text-blue-600 hover:scale-110"
                        title="View"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="text-red-600 hover:scale-110"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add Blog Modal */}
        {showAddCategoryModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-4">
            <div className="bg-white relative p-4 sm:p-6 rounded-xl shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-b-[#060a1860]">
                Add Blog Post
              </h3>
              <form onSubmit={handleSubmit(handleCreatePost)}>
                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Title*</label>
                <input
                  type="text"
                  placeholder="Enter post title"
                  className="w-full border rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C473A]"
                  {...register('title')}
                />
                {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>}

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border rounded px-3 py-2 mb-4 text-sm"
                  {...register('image')}
                />

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Content*</label>
                <EditorToolbar />
                <textarea
                  placeholder="Write your content here..."
                  className="w-full border p-2 rounded h-32 resize-none mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C473A]"
                  rows="5"
                  {...register('content')}
                />
                {errors.content && <p className="text-red-500 text-sm mb-2">{errors.content.message}</p>}

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Status*</label>
                <select
                  className="w-full border rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C473A]"
                  {...register('status')}
                >
                  <option value="">Select status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm mb-2">{errors.status.message}</p>}

                <label className="flex items-center gap-2 text-sm font-medium text-[#060a18b9] mb-4">
                  <input type="checkbox" {...register('top_stories')} />
                  Top Story
                </label>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCategoryModal(false);
                      reset();
                    }}
                    className="px-4 py-2 border rounded cursor-pointer text-sm hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2C473A] hover:bg-green-600 flex items-center gap-x-2 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
                  >
                    <FilePlus className="w-4 h-4" />
                    Create
                  </button>
                </div>
              </form>
              <button
                className="absolute top-4 right-4 text-[#060a18b9] hover:text-[#060a18]"
                onClick={() => {
                  setShowAddCategoryModal(false);
                  reset();
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Edit Blog Modal */}
        {showEditCategoryModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-4">
            <div className="bg-white relative p-4 sm:p-6 rounded-xl shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-b-[#060a1860]">
                Edit Blog Post
              </h3>
              <form onSubmit={handleSubmit(editCategory)}>
                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Title*</label>
                <input
                  type="text"
                  placeholder="Enter post title"
                  className="w-full border rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C473A]"
                  {...register('title')}
                />
                {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>}

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Current Image</label>
                <div className="mb-4">
                  {currentImage ? (
                    <img
                      src={`${IMG_URL}${currentImage}`}
                      alt="Current blog image"
                      className="w-32 h-32 object-cover rounded"
                      onError={(e) => (e.target.src = '/placeholder-image.jpg')}
                    />
                  ) : (
                    <p className="text-sm text-gray-500">No image available</p>
                  )}
                </div>

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">New Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border rounded px-3 py-2 mb-4 text-sm"
                  {...register('image')}
                />

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Content*</label>
                <EditorToolbar />
                <textarea
                  placeholder="Write your content here..."
                  className="w-full border p-2 rounded h-32 resize-none mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C473A]"
                  rows="5"
                  {...register('content')}
                />
                {errors.content && <p className="text-red-500 text-sm mb-2">{errors.content.message}</p>}

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Status*</label>
                <select
                  className="w-full border rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C473A]"
                  {...register('status')}
                >
                  <option value="">Select status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm mb-2">{errors.status.message}</p>}

                <label className="flex items-center gap-2 text-sm font-medium text-[#060a18b9] mb-4">
                  <input type="checkbox" {...register('top_stories')} />
                  Top Story
                </label>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditCategoryModal(false);
                      setSelectedCategoryId(null);
                      setCurrentImage(null);
                      reset();
                    }}
                    className="px-4 py-2 border rounded cursor-pointer text-sm hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2C473A] hover:bg-green-600 flex items-center gap-x-2 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
                  >
                    <FilePlus className="w-4 h-4" />
                    Update
                  </button>
                </div>
              </form>
              <button
                className="absolute top-4 right-4 text-[#060a18b9] hover:text-[#060a18]"
                onClick={() => {
                  setShowEditCategoryModal(false);
                  setSelectedCategoryId(null);
                  setCurrentImage(null);
                  reset();
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitorContent;