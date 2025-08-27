import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import PageManagement from "../../hooks/management";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  image: yup.mixed().nullable(),
  header: yup.string().required("Header is required"),
  sub_heading: yup.string().required("Sub heading is required"),
  title1: yup.string().required("Title 1 is required"),
  content1: yup.string().required("Content 1 is required"),
  title2: yup.string().required("Title 2 is required"),
  content2: yup.string().required("Content 2 is required"),
  title3: yup.string().required("Title 3 is required"),
  content3: yup.string().required("Content 3 is required"),
});

const PageBlock = () => {
  const {
    getPageBlock,
    createStudentPageBlock,
    deleteStudentPageBlock,
  } = PageManagement();

  const navigate = useNavigate();

  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlock, setEditingBlock] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [prevImage, setPrevImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      image: null,
      header: "",
      sub_heading: "",
      title1: "",
      content1: "",
      title2: "",
      content2: "",
      title3: "",
      content3: "",
    },
  });

  // Fetch all page blocks
  const fetchBlocks = async () => {
    setLoading(true);
    try {
      const response = await getPageBlock();
      console.log(response)
      let list = [];
      if (Array.isArray(response)) {
        list = response;
      } else if (response?.data && Array.isArray(response.data)) {
        list = response.data;
      } else if (response?.data && typeof response.data === "object") {
        list = [response.data];
      }
      setBlocks(list);
    } catch (error) {
      toast.error("Failed to load page blocks");
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  // Handle create/update
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") {
          if (editingBlock && (!value || value.length === 0)) {
            if (prevImage) formData.append("image", prevImage);
          } else if (value && value[0]) {
            formData.append("image", value[0]);
          }
        } else {
          formData.append(key, value);
        }
      });
      if (editingBlock) {
        formData.append("id", editingBlock.id);
      }
      await createStudentPageBlock(formData);
      toast.success(editingBlock ? "Block updated!" : "Block created!");
      setShowModal(false);
      setEditingBlock(null);
      setPrevImage(null);
      reset();
      fetchBlocks();
    } catch (error) {
      toast.error("Failed to save block");
    }
  };

  // Handle edit
  const handleEdit = (block) => {
    setEditingBlock(block);
    setShowModal(true);
    setValue("header", block.header);
    setValue("sub_heading", block.sub_heading);
    setValue("title1", block.title1);
    setValue("content1", block.content1);
    setValue("title2", block.title2);
    setValue("content2", block.content2);
    setValue("title3", block.title3);
    setValue("content3", block.content3);
    setValue("image", null);
    setPrevImage(block.image || null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this block?")) return;
    try {
      await deleteStudentPageBlock(id);
      toast.success("Block deleted!");
      fetchBlocks();
    } catch (error) {
      toast.error("Failed to delete block");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                onClick={() => navigate(-1)}
              >
                &larr; Back
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Page Blocks</h1>
                <p className="text-gray-600 mt-1">Manage your page content blocks</p>
              </div>
            </div>
            <button
              className="bg-[#2C473A] hover:bg-[#1e3226] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
              onClick={() => {
                setShowModal(true);
                setEditingBlock(null);
                reset();
                setPrevImage(null);
              }}
            >
              + Add New Block
            </button>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#2C473A]"></div>
          </div>
        ) : blocks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No page blocks found</h3>
              <p className="mt-2 text-gray-500">Get started by creating your first page block.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Block Header */}
                <div className="bg-gradient-to-r from-[#2C473A] to-[#3a5a4a] px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      {block.image && (
                        <img
                          src={block.image.startsWith("http") ? block.image : `${import.meta.env.VITE_IMAGE_URL}${block.image}`}
                          alt="block"
                          className="h-12 w-12 object-cover rounded-lg border-2 border-white"
                        />
                      )}
                      <div>
                        <h2 className="text-xl font-bold text-white">{block.header}</h2>
                        <p className="text-green-100">{block.sub_heading}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        onClick={() => handleEdit(block)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        onClick={() => handleDelete(block.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* Block Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Section 1 */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#2C473A] rounded-full"></div>
                        <h3 className="font-semibold text-[#2C473A] text-lg">{block.title1}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{block.content1}</p>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#2C473A] rounded-full"></div>
                        <h3 className="font-semibold text-[#2C473A] text-lg">{block.title2}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{block.content2}</p>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#2C473A] rounded-full"></div>
                        <h3 className="font-semibold text-[#2C473A] text-lg">{block.title3}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{block.content3}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for create/update */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {editingBlock ? "Edit Page Block" : "Create New Page Block"}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingBlock(null);
                      reset();
                      setPrevImage(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Header</label>
                    <input
                      type="text"
                      {...register("header")}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2C473A] focus:border-[#2C473A] transition-colors duration-200"
                      placeholder="Enter header text"
                    />
                    {errors.header && (
                      <p className="text-red-500 text-sm mt-1">{errors.header.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sub Heading</label>
                    <input
                      type="text"
                      {...register("sub_heading")}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2C473A] focus:border-[#2C473A] transition-colors duration-200"
                      placeholder="Enter sub heading"
                    />
                    {errors.sub_heading && (
                      <p className="text-red-500 text-sm mt-1">{errors.sub_heading.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <input
                    type="file"
                    {...register("image")}
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2C473A] focus:border-[#2C473A] transition-colors duration-200"
                  />
                  {editingBlock && prevImage && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">Current image:</span>
                      <img
                        src={prevImage.startsWith("http") ? prevImage : `${import.meta.env.VITE_IMAGE_URL}${prevImage}`}
                        alt="Current"
                        className="h-12 w-12 object-cover rounded mt-1 border"
                      />
                    </div>
                  )}
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                  )}
                </div>

                <div className="space-y-6">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-4">Section {num}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title {num}</label>
                          <input
                            type="text"
                            {...register(`title${num}`)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2C473A] focus:border-[#2C473A] transition-colors duration-200"
                            placeholder={`Enter title ${num}`}
                          />
                          {errors[`title${num}`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`title${num}`].message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Content {num}</label>
                          <textarea
                            {...register(`content${num}`)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2C473A] focus:border-[#2C473A] transition-colors duration-200"
                            rows={3}
                            placeholder={`Enter content ${num}`}
                          />
                          {errors[`content${num}`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`content${num}`].message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingBlock(null);
                      reset();
                      setPrevImage(null);
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#2C473A] text-white rounded-lg font-medium hover:bg-[#1e3226] transition-colors duration-200 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : editingBlock ? "Update Block" : "Create Block"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBlock;