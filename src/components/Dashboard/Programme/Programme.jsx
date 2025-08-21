import { useEffect, useState } from 'react';
import PageManagement from '../../../hooks/management';
import toast from 'react-hot-toast';
import { EyeIcon } from 'lucide-react';

const MonitorContent = () => {
  const { getPrograms, deleteProgramme, getProgramById } = PageManagement();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const data = await getPrograms();
      setCategories(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    toast.promise(
      (async () => {
        await deleteProgramme(deleteSlug);
        setCategories(categories.filter((cat) => cat.slug !== deleteSlug));
        setShowDeleteModal(false);
        setDeleteSlug(null);
      })(),
      {
        loading: "Deleting programme...",
        success: () => {
          return "Programme deleted successfully";
        },
        error: (err) => {
          console.error(err);
          return "Error deleting programme";
        },
      }
    ).finally(() => setLoading(false));
  };

  const openDeleteModal = (slug) => {
    setDeleteSlug(slug);
    setShowDeleteModal(true);
  };

  const handleEdit = (slug) => {
    window.location.href = `/dashboard/edit-program/${slug}`;
  };

  const handleView = async (slug) => {
    window.location.href = `/dashboard/program/${slug}`;
  };

  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="p-4 bg-white rounded-xl shadow sm:p-6">
        <div className="flex flex-col justify-between items-start mb-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold text-[#252B42] sm:text-2xl">Programmes</h2>
          <button
            onClick={() => { window.location.href = '/dashboard/add-program'; }}
            className="mt-2 bg-[#2C473A] text-white cursor-pointer px-4 py-2 rounded-sm hover:bg-green-700 sm:mt-0"
          >
            + Add Program
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-green-50 rounded overflow-hidden">
            <thead className="bg-[#10172B] text-white font-medium text-sm sm:text-base text-left">
              <tr>
                <th className="px-2 py-2 w-8 sm:px-4 sm:w-12"></th>
                <th className="px-2 py-2 sm:px-4">ID</th>
                <th className="px-2 py-2 sm:px-4">Title</th>
                <th className="px-2 py-2 sm:px-4">Description</th>
                <th className="px-4 py-2 text-right sm:px-8">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">Loading...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">No Programmes found.</td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr className="border-b" key={cat.id}>
                    <td className="px-2 py-2 w-8 text-[#060a18b9] sm:px-4 sm:w-12"></td>
                    <td className="px-2 py-2 text-sm sm:px-4 sm:text-base">{cat.id}</td>
                    <td className="px-2 py-2 font-medium text-sm sm:px-4 sm:text-base">{cat.title}</td>
                    <td className="px-2 py-2 font-medium text-sm sm:px-4 sm:text-base">{cat.description }</td>
                    <td className="px-4 py-2 flex gap-x-2 sm:gap-y-0 cursor-pointer text-right justify-end text-base sm:text-lg">
                      <button
                        onClick={() => handleEdit(cat.slug)}
                        className="text-purple-600 hover:scale-110"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleView(cat.slug)}
                        className="text-blue-600 text-sm"
                      >
                        <EyeIcon />
                      </button>
                      <button
                        onClick={() => openDeleteModal(cat.slug)}
                        className="text-red-600 hover:scale-110"
                        disabled={loading}
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
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Delete Program</h3>
            <p className="mb-6">Are you sure you want to delete this program?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitorContent;