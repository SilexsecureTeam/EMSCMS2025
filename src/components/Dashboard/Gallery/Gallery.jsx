import React, { useEffect, useState } from 'react';
import { FilePlus, X } from 'lucide-react';
import PageManagement from '../../../hooks/management';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Gallery = () => {
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [currentImages, setCurrentImages] = useState([null, null, null]);
  const { getAllGalleries, createGallery, updateGallery } = PageManagement();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
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
    image2: yup.mixed().nullable(),
    image3: yup.mixed().nullable(),
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
    },
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    setLoading(true);
    try {
      const data = await getAllGalleries();
      console.log('Fetched galleries:', data);
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
        gallery.image1 || null,
        gallery.image2 || null,
        gallery.image3 || null,
      ]);
    } else {
      setEditingGalleryId(null);
      reset();
      setCurrentImages([null, null, null]);
    }
    setShowAddGalleryModal(true);
  };

  /** CREATE (FormData) **/
  const handleCreateGallery = async (data) => {
    const formData = new FormData();
    formData.append('gallery_header', data.gallery_header);
    formData.append('sub_header', data.sub_header);
    formData.append('title', data.title);
    if (data.image1 && data.image1.length > 0) formData.append('image1', data.image1[0]);
    if (data.image2 && data.image2.length > 0) formData.append('image2', data.image2[0]);
    if (data.image3 && data.image3.length > 0) formData.append('image3', data.image3[0]);

    await toast.promise(
      createGallery(formData),
      {
        pending: 'Creating gallery...',
        success: 'Gallery created successfully',
        error: 'Failed to create gallery',
      }
    );
  };


  const handleUpdateGallery = async (id, data) => {
    const formData = new FormData();
    formData.append('gallery_header', data.gallery_header);
    formData.append('sub_header', data.sub_header);
    formData.append('title', data.title);
    if (data.image1 && data.image1.length > 0) formData.append('image1', data.image1[0]);
    if (data.image2 && data.image2.length > 0) formData.append('image2', data.image2[0]);
    if (data.image3 && data.image3.length > 0) formData.append('image3', data.image3[0]);
    formData.append("_method","PATCH");
    
    await toast.promise(
      updateGallery(id, formData),
      {
        pending: 'Updating gallery...',
        success: 'Gallery updated successfully',
        error: 'Failed to update gallery',
      }
    );
  };


  const onSave = async (data) => {
    try {
      setLoading(true);
      if (editingGalleryId) {
        await handleUpdateGallery(editingGalleryId, data);
      } else {
        await handleCreateGallery(data);
      }
      await fetchGalleries();
      reset();
      setCurrentImages([null, null, null]);
      setShowAddGalleryModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
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
          <table className="min-w-full bg-green-50 rounded overflow-hidden">
            <thead className="bg-[#10172B] text-white font-medium text-sm sm:text-base text-left">
              <tr>
                <th className="px-2 py-2 sm:px-4">Title</th>
                <th className="px-2 py-2 sm:px-4">Gallery Header</th>
                <th className="px-2 py-2 sm:px-4">Sub Header</th>
                <th className="px-2 py-2 sm:px-4">Images</th>
                <th className="px-2 py-2 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">Loading...</td>
                </tr>
              ) : galleries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">No gallery entries found</td>
                </tr>
              ) : (
                galleries.map((gallery) => (
                  <tr key={gallery.id} className="border-b">
                    <td className="px-2 py-2 sm:px-4">{gallery.title}</td>
                    <td className="px-2 py-2 sm:px-4">{gallery.gallery_header}</td>
                    <td className="px-2 py-2 sm:px-4">{gallery.sub_header}</td>
                    <td className="px-2 py-2 sm:px-4">
                      <div className="flex space-x-2">
                        {gallery.image1 && <img src={IMG_URL + gallery.image1} alt="" className="w-10 h-10 object-cover rounded" />}
                        {gallery.image2 && <img src={IMG_URL + gallery.image2} alt="" className="w-10 h-10 object-cover rounded" />}
                        {gallery.image3 && <img src={IMG_URL + gallery.image3} alt="" className="w-10 h-10 object-cover rounded" />}
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-4">
                      <button
                        onClick={() => handleOpenModal(gallery)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
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
                    <div className="flex space-x-2">
                      {currentImages.map((img, i) => img && (
                        <img key={i} src={img} alt={`Current gallery ${i + 1}`} className="w-20 h-20 object-cover rounded" />
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

                <label className="text-sm font-medium pb-1 block">Image 1</label>
                <input type="file" accept="image/*" {...register('image1')} className="w-full border rounded px-3 py-2 mb-4" />

                <label className="text-sm font-medium pb-1 block">Image 2</label>
                <input type="file" accept="image/*" {...register('image2')} className="w-full border rounded px-3 py-2 mb-4" />

                <label className="text-sm font-medium pb-1 block">Image 3</label>
                <input type="file" accept="image/*" {...register('image3')} className="w-full border rounded px-3 py-2 mb-4" />

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddGalleryModal(false);
                      reset();
                      setCurrentImages([null, null, null]);
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
                  setCurrentImages([null, null, null]);
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

export default Gallery;
