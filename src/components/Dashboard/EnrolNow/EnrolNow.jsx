import React, { useEffect, useState } from 'react';
import { FilePlus, X, Download } from 'lucide-react';
import PageManagement from '../../../hooks/management';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const EnrolNow = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentHeaderImage, setCurrentHeaderImage] = useState(null);
  const { getAllEnrollment,createEnrollment, downloadEnrollPdf } = PageManagement();
  const [enrolData, setEnrolData] = useState([]);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    header_image: yup.mixed().nullable(),
    pdf_file: yup.mixed().nullable(),
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
      header_image: null,
      pdf_file: null,
    },
  });

 useEffect(() => {
  const fetchEnrolNow = async () => {
    setLoading(true);
    try {
      const data = await getAllEnrollment();
      console.log("Fetched enrol data:", data);

      // Normalize to array
      if (Array.isArray(data)) {
        setEnrolData(data);
      } else if (data && typeof data === 'object') {
        setEnrolData([data]); // Wrap single object in array
      } else {
        setEnrolData([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load Enrol Now data');
      setEnrolData([]);
    } finally {
      setLoading(false);
    }
  };
  fetchEnrolNow();
}, []);


  const handleOpenModal = () => {
    if (enrolData.length > 0) {
      const item = enrolData[0];
      setValue('title', item.title || '');
      setValue('content', item.content || '');
      setCurrentHeaderImage(item.header_image || null);
    } else {
      reset();
      setCurrentHeaderImage(null);
    }
    setShowModal(true);
  };

const handleSave = async (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  if (data.header_image && data.header_image.length > 0) {
    formData.append('header_image', data.header_image[0]);
  }
  if (data.pdf_file && data.pdf_file.length > 0) {
    formData.append('pdf_file', data.pdf_file[0]);
  }

  try {
    setLoading(true);
    await toast.promise(
      createEnrollment(formData),
      {
        pending: 'Saving...',
        success: 'Enrol Now content saved',
        error: (error) => error.response?.data?.message || 'Failed to save',
      }
    );

    const updated = await getAllEnrollment();

    // ✅ Normalize so table always has valid array
    if (Array.isArray(updated)) {
      setEnrolData(updated);
    } else if (updated && typeof updated === 'object') {
      setEnrolData([updated]);
    } else {
      setEnrolData([]);
    }

    reset();
    setCurrentHeaderImage(null);
    setShowModal(false);
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to save');
  } finally {
    setLoading(false);
  }
};


const handleDownloadPdf = async (id) => {
  await toast.promise(
    downloadEnrollPdf(id),
    {
      pending: 'Downloading...',
      success: 'PDF downloaded',
      error: 'Failed to download PDF'
    }
  );
};


  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="p-4 bg-white rounded-xl shadow sm:p-6">
        <div className="flex flex-col justify-between items-start mb-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold text-[#252B42] sm:text-2xl">Enrol Now Page Management</h2>
          <button
            onClick={handleOpenModal}
            className="mt-2 bg-[#2C473A] text-white cursor-pointer px-4 py-2 rounded-sm hover:bg-green-700 sm:mt-0"
          >
            + Add/Update Enrol Now Content
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-green-50 rounded overflow-hidden">
            <thead className="bg-[#10172B] text-white font-medium text-sm sm:text-base text-left">
              <tr>
                <th className="px-2 py-2 sm:px-4">Title</th>
                <th className="px-2 py-2 sm:px-4">Content</th>
                <th className="px-2 py-2 sm:px-4">Header Image</th>
                <th className="px-2 py-2 sm:px-4">PDF File</th>
                <th className="px-2 py-2 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">Loading...</td>
                </tr>
              ) : enrolData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">No Enrol Now content found</td>
                </tr>
              ) : (
                enrolData.map((item) => (
                  <tr key={item.id || 'enrol'} className="border-b">
                    <td className="px-2 py-2 sm:px-4">{item.title}</td>
                    <td className="px-2 py-2 sm:px-4">{item.content?.substring(0, 50)}...</td>
                    <td className="px-2 py-2 sm:px-4">
                      {item.header_image ? (
                        <img
                          src={item.header_image}
                          alt="Header"
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => (e.target.src = '/placeholder-image.jpg')}
                        />
                      ) : 'No Image'}
                    </td>
                    <td className="px-2 py-2 sm:px-4">
                      {item.pdf_file ? (
                        <button
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                          onClick={() => handleDownloadPdf(item.id)}
                        >
                          <Download className="w-4 h-4" /> Download
                        </button>
                      ) : 'No PDF'}
                    </td>
                    <td className="px-2 py-2 sm:px-4">
                      <button
                        onClick={handleOpenModal}
                        className="text-[#2C473A] hover:text-green-700"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add/Update Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-4">
            <div className="bg-white relative p-4 sm:p-6 rounded-xl shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-b-[#060a1860]">
                {enrolData.length > 0 ? 'Update Enrol Now Content' : 'Add Enrol Now Content'}
              </h3>
              <form onSubmit={handleSubmit(handleSave)}>
                {enrolData.length > 0 && currentHeaderImage && (
                  <div className="mb-4">
                    <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Current Header Image</label>
                    <img
                      src={currentHeaderImage}
                      alt="Current header"
                      className="w-32 h-32 object-cover rounded"
                      onError={(e) => (e.target.src = '/placeholder-image.jpg')}
                    />
                  </div>
                )}

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Title*</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  className="w-full border rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C473A]"
                  {...register('title')}
                />
                {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>}

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Content*</label>
                <textarea
                  placeholder="Enter content"
                  className="w-full border rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C473A]"
                  rows="5"
                  {...register('content')}
                />
                {errors.content && <p className="text-red-500 text-sm mb-2">{errors.content.message}</p>}

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">Header Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border rounded px-3 py-2 mb-4 text-sm"
                  {...register('header_image')}
                />

                <label className="text-sm font-medium pb-1 text-[#060a18b9] block">PDF File (Optional)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  className="w-full border rounded px-3 py-2 mb-4 text-sm"
                  {...register('pdf_file')}
                />

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      reset();
                      setCurrentHeaderImage(null);
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
                    {enrolData.length > 0 ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
              <button
                className="absolute top-4 right-4 text-[#060a18b9] hover:text-[#060a18]"
                onClick={() => {
                  setShowModal(false);
                  reset();
                  setCurrentHeaderImage(null);
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

export default EnrolNow;
