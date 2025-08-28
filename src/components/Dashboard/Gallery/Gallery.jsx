import React, { useEffect, useState } from 'react';
import { DeleteIcon, FilePlus, Pen, X, Eye } from 'lucide-react'; 
import PageManagement from '../../../hooks/management';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Gallery = () => {
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [currentImages, setCurrentImages] = useState(Array(10).fill(null));
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const { getAllGalleries, createGallery, updateGallery, deleteGallery } = PageManagement();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState(null);

  const IMG_URL = import.meta.env.VITE_IMAGE_URL;

  const schema = yup.object().shape({
    gallery_header: yup.string().required('Gallery header is required'),
    sub_header: yup.string().required('Sub header is required'),
    title: yup.string().required('Title is required'),
    image1: yup
      .mixed()
      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 2_000_000;
      }).nullable(),
    image2: yup
      .mixed()
      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 2_000_000;
      }).nullable(),
    image3: yup
      .mixed()
      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 2_000_000;
      }).nullable(),
    image4: yup
      .mixed()
      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 2_000_000;
      }).nullable(),
    image5: yup
      .mixed()
      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 2_000_000;
      }).nullable(),
    image6: yup
      .mixed()
      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 2_000_000;
      }).nullable(),
    image7: yup
      .mixed()
      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 2_000_000;
      }).nullable(),
    image8: yup
      .mixed()
      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 2_000_000;
      }).nullable(),
    image9: yup
      .mixed()
      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 2_000_000;
      }).nullable(),
    image10: yup
      .mixed()
      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
        if (!value || !value[0]) return true;
        return value[0].size <= 2_000_000;
      }).nullable(),
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
      gallery_header: '',
      sub_header: '',
      title: '',
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
      image6: null,
      image7: null,
      image8: null,
      image9: null,
      image10: null,
    },
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    setLoading(true);
    try {
      const data = await getAllGalleries();
      const galleryData = Array.isArray(data.data) ? data.data : data.data ? [data.data] : [];
      setGalleries(galleryData);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load galleries');
      setGalleries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (gallery = null) => {
    if (gallery) {
      setEditingGalleryId(gallery.id);
      setValue('gallery_header', gallery.gallery_header || '');
      setValue('sub_header', gallery.sub_header || '');
      setValue('title', gallery.title || '');
      setCurrentImages([
        gallery.image1 ? `${IMG_URL}${gallery.image1}` : null,
        gallery.image2 ? `${IMG_URL}${gallery.image2}` : null,
        gallery.image3 ? `${IMG_URL}${gallery.image3}` : null,
        gallery.image4 ? `${IMG_URL}${gallery.image4}` : null,
        gallery.image5 ? `${IMG_URL}${gallery.image5}` : null,
        gallery.image6 ? `${IMG_URL}${gallery.image6}` : null,
        gallery.image7 ? `${IMG_URL}${gallery.image7}` : null,
        gallery.image8 ? `${IMG_URL}${gallery.image8}` : null,
        gallery.image9 ? `${IMG_URL}${gallery.image9}` : null,
        gallery.image10 ? `${IMG_URL}${gallery.image10}` : null,
      ]);
    } else {
      setEditingGalleryId(null);
      reset();
      setCurrentImages(Array(10).fill(null));
    }
    setShowAddGalleryModal(true);
  };

  const viewGalleryImages = (gallery) => {
    const images = [];
    for (let i = 1; i <= 10; i++) {
      if (gallery[`image${i}`]) {
        images.push(`${IMG_URL}${gallery[`image${i}`]}`);
      }
    }
    setSelectedGalleryImages(images);
    setShowImageModal(true);
  };

  const handleCreateGallery = async (data) => {
    const formData = new FormData();
    formData.append('gallery_header', data.gallery_header);
    formData.append('sub_header', data.sub_header);
    formData.append('title', data.title);
    
    // Handle all images
    for (let i = 1; i <= 10; i++) {
      const imageField = `image${i}`;
      if (data[imageField] && data[imageField].length > 0) {
        formData.append(imageField, data[imageField][0]);
      }
    }

    await createGallery(formData);
  };

  const handleUpdateGallery = async (id, data) => {
    const formData = new FormData();
    formData.append('gallery_header', data.gallery_header);
    formData.append('sub_header', data.sub_header);
    formData.append('title', data.title);
    
    // Handle all images
    for (let i = 1; i <= 10; i++) {
      const imageField = `image${i}`;
      if (data[imageField] && data[imageField].length > 0) {
        formData.append(imageField, data[imageField][0]);
      }
    }
    
    formData.append("_method", "PATCH");

    await updateGallery(id, formData);
  };

  const confirmDelete = (id) => {
    setGalleryToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteGallery = async () => {
    try {
      await toast.promise(
        deleteGallery(galleryToDelete),
        {
          pending: 'Deleting gallery...',
          success: 'Gallery deleted successfully',
          error: 'Failed to delete gallery',
        }
      );
      fetchGalleries(); 
      setShowDeleteModal(false);
      setGalleryToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Deletion failed');
    }
  };

  const onSave = async (data) => {
    try {
      setLoading(true);
      if (editingGalleryId) {
        await toast.promise(
          handleUpdateGallery(editingGalleryId, data),
          {
            pending: 'Updating gallery...',
            success: 'Gallery updated successfully',
            error: 'Failed to update gallery',
          }
        );
      } else {
        await toast.promise(
          handleCreateGallery(data),
          {
            pending: 'Creating gallery...',
            success: 'Gallery created successfully',
            error: 'Failed to create gallery',
          }
        );
      }
      await fetchGalleries();
      reset();
      setCurrentImages(Array(10).fill(null));
      setShowAddGalleryModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const getImageCount = (gallery) => {
    let count = 0;
    for (let i = 1; i <= 10; i++) {
      if (gallery[`image${i}`]) count++;
    }
    return count;
  };

  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="p-4 bg-white rounded-xl shadow sm:p-6">
        <div className="flex flex-col justify-between items-start mb-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold text-[#252B42] sm:text-2xl">Gallery Management</h2>
          <button
            onClick={() => handleOpenModal()}
            className="mt-2 bg-[#2C473A] text-white cursor-pointer px-4 py-2 rounded-sm hover:bg-green-700 sm:mt-0"
          >
            + Add Gallery Entry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-green-50 rounded table-auto">
            <thead className="bg-[#10172B] text-white font-medium text-sm sm:text-base text-left">
              <tr>
                <th className="px-3 py-3 min-w-[120px]">Title</th>
                <th className="px-3 py-3 min-w-[150px]">Gallery Header</th>
                <th className="px-3 py-3 min-w-[120px]">Sub Header</th>
                <th className="px-3 py-3 w-32 text-center">Preview</th>
                <th className="px-3 py-3 w-20 text-center">Images</th>
                <th className="px-3 py-3 w-16 text-center">View</th>
                <th className="px-3 py-3 w-16 text-center">Edit</th>
                <th className="px-3 py-3 w-16 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8">Loading...</td>
                </tr>
              ) : galleries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8">No gallery entries found</td>
                </tr>
              ) : (
                galleries.map((gallery) => (
                  <tr key={gallery.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-3">
                      <div className="max-w-[120px] truncate" title={gallery.title}>
                        {gallery.title}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="max-w-[150px] truncate" title={gallery.gallery_header}>
                        {gallery.gallery_header}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="max-w-[120px] truncate" title={gallery.sub_header}>
                        {gallery.sub_header}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1 justify-center">
                        {gallery.image1 && (
                          <img 
                            src={`${IMG_URL}${gallery.image1}`} 
                            alt="" 
                            className="w-8 h-8 object-cover rounded border" 
                          />
                        )}
                        {gallery.image2 && (
                          <img 
                            src={`${IMG_URL}${gallery.image2}`} 
                            alt="" 
                            className="w-8 h-8 object-cover rounded border" 
                          />
                        )}
                        {gallery.image3 && (
                          <img 
                            src={`${IMG_URL}${gallery.image3}`} 
                            alt="" 
                            className="w-8 h-8 object-cover rounded border" 
                          />
                        )}
                        {getImageCount(gallery) > 3 && (
                          <div className="w-8 h-8 bg-gray-200 rounded border flex items-center justify-center text-xs font-medium text-gray-600">
                            +{getImageCount(gallery) - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {getImageCount(gallery)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => viewGalleryImages(gallery)}
                        className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded hover:bg-green-700 mx-auto"
                        title="View all images"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => handleOpenModal(gallery)}
                        className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded hover:bg-blue-700 mx-auto"
                        title="Edit gallery"
                      >
                        <Pen className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => confirmDelete(gallery.id)}
                        className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded hover:bg-red-700 mx-auto"
                        title="Delete gallery"
                      >
                        <DeleteIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Image View Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-50 p-4">
            <div className="bg-white relative p-4 sm:p-6 rounded-xl shadow-md w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <h3 className="text-lg font-semibold">Gallery Images</h3>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedGalleryImages.map((img, index) => (
                  <div key={index} className="aspect-square">
                    <img 
                      src={img} 
                      alt={`Gallery image ${index + 1}`} 
                      className="w-full h-full object-cover rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showAddGalleryModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-4">
            <div className="bg-white relative p-4 sm:p-6 rounded-xl shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-b-[#060a1860]">
                {editingGalleryId ? 'Update Gallery Entry' : 'Add Gallery Entry'}
              </h3>
              <form onSubmit={handleSubmit(onSave)}>
                {editingGalleryId && currentImages.some(img => img) && (
                  <div className="mb-4">
                    <label className="text-sm font-medium pb-1 block">Current Images</label>
                    <div className="grid grid-cols-3 gap-2">
                      {currentImages.map((img, i) => img && (
                        <img key={i} src={img} alt={`Current gallery ${i + 1}`} className="w-full h-20 object-cover rounded border" />
                      ))}
                    </div>
                  </div>
                )}

                <label className="text-sm font-medium pb-1 block">Gallery Header*</label>
                <input type="text" {...register('gallery_header')} className="w-full border rounded px-3 py-2 mb-4" />
                {errors.gallery_header && <p className="text-red-500 text-sm mb-2">{errors.gallery_header.message}</p>}

                <label className="text-sm font-medium pb-1 block">Sub Header*</label>
                <input type="text" {...register('sub_header')} className="w-full border rounded px-3 py-2 mb-4" />
                {errors.sub_header && <p className="text-red-500 text-sm mb-2">{errors.sub_header.message}</p>}

                <label className="text-sm font-medium pb-1 block">Title*</label>
                <input type="text" {...register('title')} className="w-full border rounded px-3 py-2 mb-4" />
                {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>}

                {/* Generate image inputs dynamically */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <div key={num}>
                      <label className="text-sm font-medium pb-1 block">Image {num}</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        {...register(`image${num}`)} 
                        className="w-full border rounded px-3 py-2 mb-2 text-sm" 
                      />
                      {errors[`image${num}`] && (
                        <p className="text-red-500 text-xs mb-2">{errors[`image${num}`].message}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddGalleryModal(false);
                      reset();
                      setCurrentImages(Array(10).fill(null));
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2C473A] text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    <FilePlus className="w-4 h-4 inline-block mr-1" />
                    {editingGalleryId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
              <button
                className="absolute top-4 right-4"
                onClick={() => {
                  setShowAddGalleryModal(false);
                  reset();
                  setCurrentImages(Array(10).fill(null));
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
              <p className="mb-4">Are you sure you want to delete this gallery entry? This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setGalleryToDelete(null); 
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteGallery}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;