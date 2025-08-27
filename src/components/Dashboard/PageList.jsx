import React, { useEffect, useState } from "react";
import { Edit2, Eye, CornerDownRightIcon, X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import PageManagement from "../../hooks/management";
import { toast } from "react-hot-toast";
import EditPageModal from "./EditPageModal"; 

const PageList = () => {
  const { getAllPages, deletePage } = PageManagement();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [editPage, setEditPage] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, page: null });

  // Fetch all pages on mount
  useEffect(() => {
    const fetchAllPages = async () => {
      setLoading(true);
      try {
        const response = await getAllPages();
        const pageData = Array.isArray(response)
          ? response
          : response.data && Array.isArray(response.data)
          ? response.data
          : response.data
          ? [response.data]
          : [];
        setPages(pageData);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load pages");
        setPages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPages();
  }, []);

  // Open modal with page details
  const openModal = (page) => {
    setSelectedPage(page);
  };

  // Close modal
  const closeModal = () => {
    setSelectedPage(null);
  };

  // Open edit modal
  const openEditModal = (page) => {
    setEditPage(page);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditPage(null);
  };

  // Refresh pages after edit/delete
  const refreshPages = async () => {
    setLoading(true);
    try {
      const response = await getAllPages();
      const pageData = Array.isArray(response)
        ? response
        : response.data && Array.isArray(response.data)
        ? response.data
        : response.data
        ? [response.data]
        : [];
      setPages(pageData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load pages");
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  // Open delete modal
  const openDeleteModal = (page) => {
    setDeleteModal({ open: true, page });
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModal({ open: false, page: null });
  };

  // Delete page handler (using parent_page as identifier)
  const handleDeletePage = async () => {
    const parentPage = deleteModal.page?.parent_page;
    if (!parentPage) return;
    setLoading(true);
    try {
      await deletePage(parentPage);
      toast.success("Page deleted successfully");
      closeDeleteModal();
      refreshPages();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete page");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-100 pt-15 p-4 sm:p-6 lg:p-10">
      {/* Top Section */}
      <div className="flex flex-col p-6 bg-white rounded-lg sm:border-r-6 sm:border-r-[#C5AC8E] sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-[#C5AC8E] mx-auto sm:mx-0"></div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/dashboard/pages/create"
            className="bg-[#C5AC8E] text-[15px] text-white cursor-pointer py-2 px-4 rounded-lg w-full sm:w-auto text-center"
          >
            Create New Page
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex mt-15 mb-1 w-full">
        <div className="h-[30px] sm:h-[60px] bg-[#2C473A] w-1/2"></div>
        <div className="h-[30px] sm:h-[60px] bg-black w-1/2"></div>
      </div>

      <div className="bg-white rounded-lg overflow-x-auto">
        <table className="min-w-[800px] w-full text-left">
          <thead className="bg-white text-[#2B2D42] text-lg font-light">
            <tr>
              <th className="p-3 font-light sm:p-4 whitespace-nowrap"></th>
              <th className="p-3 font-light sm:p-4 whitespace-nowrap">Parent Page</th>
              <th className="p-3 font-light sm:p-4 whitespace-nowrap">Header Title</th>
             
              <th className="p-3 font-light sm:p-4 whitespace-nowrap">Published Date</th>
              <th className="p-3 font-light sm:p-4 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8">Loading...</td>
              </tr>
            ) : pages.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8">No pages found</td>
              </tr>
            ) : (
              pages.map((page, index) => (
                <tr key={page.id || index} className="bg-white shadow-sm hover:bg-gray-100">
                  <td className="py-3 border-gray-100 border-y-3 text-[#2B2D42] sm:py-4 text-center bg-gray-100 w-[60px] whitespace-nowrap">
                    <CornerDownRightIcon className="text-center w-full text-[#D9D9D9]" />
                  </td>
                  <td className="p-3 border-gray-100 border-y-7 text-[#2B2D42] font-light sm:p-4 whitespace-nowrap">
                    {page.parent_page || "None"}
                  </td>
                  <td className="p-3 border-gray-100 border-y-7 text-[#2B2D42] font-light sm:p-4 whitespace-nowrap">
                    {page.header_title || "Untitled"}
                  </td>
                  
                  <td className="p-3 border-gray-100 border-y-7 text-[#2B2D42] font-light sm:p-4 whitespace-nowrap w-[200px]">
                    {page.created_at
                      ? new Date(page.created_at).toLocaleDateString("en-CA") +
                        " at " +
                        new Date(page.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Unknown"}
                  </td>
                  <td className="p-3 border-gray-100 border-y-7 text-[#2B2D42] font-light sm:p-4 whitespace-nowrap">
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => openModal(page)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => openEditModal(page)}
                        className="flex items-center gap-2 text-green-600 hover:text-green-800"
                      >
                        <Edit2 size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => openDeleteModal(page)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#2B2D42]">Delete Page</h3>
              <button onClick={closeDeleteModal} className="text-[#060a18b9] hover:text-[#060a18]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete <span className="font-bold">{deleteModal.page?.header_title || deleteModal.page?.parent_page}</span>?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDeletePage}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 w-full"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Detailed View */}
      {selectedPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#2B2D42]">Page Details</h3>
              <button onClick={closeModal} className="text-[#060a18b9] hover:text-[#060a18]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-light text-[18px]">ID</label>
                <p className="border-b p-2">{selectedPage.id || "N/A"}</p>
              </div>
              <div>
                <label className="block font-light text-[18px]">Parent Page</label>
                <p className="border-b p-2">{selectedPage.parent_page || "None"}</p>
              </div>
              <div>
                <label className="block font-light text-[18px]">Slider Images</label>
                {Array.isArray(selectedPage.sliders) && selectedPage.sliders.length > 0 ? (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {selectedPage.sliders.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Slider ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="border-b p-2 text-gray-500">No slider images</p>
                )}
              </div>
              <div>
                <label className="block font-light text-[18px]">Header Title</label>
                <p className="border-b p-2">{selectedPage.header_title || "Untitled"}</p>
              </div>
              <div>
                <label className="block font-light text-[18px]">Header Description</label>
                <p className="border-b p-2">{selectedPage.header_description || "None"}</p>
              </div>
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="space-y-2">
                  <div>
                    <label className="block font-light text-[18px]">Title {idx}</label>
                    <p className="border-b p-2">{selectedPage[`title_${idx}`] || "None"}</p>
                  </div>
                  <div>
                    <label className="block font-light text-[18px]">Content {idx}</label>
                    <p className="border-b p-2">{selectedPage[`content_${idx}`] || "None"}</p>
                  </div>
                  <div>
                    <label className="block font-light text-[18px]">Content Image {idx}</label>
                    {selectedPage[`content_${idx}_image`] ? (
                      <img
                        src={selectedPage[`content_${idx}_image`]}
                        alt={`Content ${idx} Image`}
                        className="w-24 h-24 object-cover rounded-md mt-2"
                      />
                    ) : (
                      <p className="border-b p-2 text-gray-500">No image</p>
                    )}
                  </div>
                </div>
              ))}
              <div>
                <label className="block font-light text-[18px]">Green Title</label>
                <p className="border-b p-2">{selectedPage.green_title || "None"}</p>
              </div>
              <div>
                <label className="block font-light text-[18px]">Green Description</label>
                <p className="border-b p-2">{selectedPage.green_description || "None"}</p>
              </div>
              <div>
                <label className="block font-light text-[18px]">Footer Title</label>
                <p className="border-b p-2">{selectedPage.footer_title || "None"}</p>
              </div>
              <div>
                <label className="block font-light text-[18px]">Footer Contact Email</label>
                <p className="border-b p-2">{selectedPage.footer_contact || "None"}</p>
              </div>
              <div>
                <label className="block font-light text-[18px]">Footer Description</label>
                <p className="border-b p-2">{selectedPage.footer_description || "None"}</p>
              </div>
              <div>
                <label className="block font-light text-[18px]">Created At</label>
                <p className="border-b p-2">
                  {selectedPage.created_at
                    ? new Date(selectedPage.created_at).toLocaleDateString("en-CA") +
                      " at " +
                      new Date(selectedPage.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Unknown"}
                </p>
              </div>
              <div>
                <label className="block font-light text-[18px]">Updated At</label>
                <p className="border-b p-2">
                  {selectedPage.updated_at
                    ? new Date(selectedPage.updated_at).toLocaleDateString("en-CA") +
                      " at " +
                      new Date(selectedPage.updated_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Unknown"}
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 w-full py-2 border rounded text-sm hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editPage && (
        <EditPageModal
          page={editPage}
          onClose={closeEditModal}
          onSuccess={() => {
            closeEditModal();
            refreshPages();
          }}
        />
      )}
    </div>
  );
};

export default PageList;