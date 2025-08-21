import React, { useEffect, useState } from 'react';
import { FilePlus, X, PlusCircle, Trash2 } from 'lucide-react';
import PageManagement from '../../../hooks/management';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Career = () => {
  const [showAddCareerModal, setShowAddCareerModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const { getCareer, createCareer } = PageManagement();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.array().of(yup.string().required('Content item is required')).min(1, 'At least one content item is required'),
    placement_header: yup.string().required('Placement header is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    image: yup.mixed().nullable(),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      content: [''],
      placement_header: '',
      email: '',
      image: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'content',
  });

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      try {
        const data = await getCareer();
        const careerData = Array.isArray(data) ? data : data.data ? [data.data] : [];
        // Normalize content to ensure it's an array
        const normalizedCareers = careerData.map(career => ({
          ...career,
          content: Array.isArray(career.content)
            ? career.content
            : typeof career.content === 'string'
              ? JSON.parse(career.content)
              : [],
        }));
        setCareers(normalizedCareers);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load careers');
        setCareers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleOpenModal = () => {
    if (careers.length > 0) {
      const career = careers[0];
      setValue('title', career.title || '');
      setValue('placement_header', career.placement_header || '');
      setValue('email', career.email || '');
      setValue('content', career.content.length > 0 ? career.content : ['']);
      setCurrentImage(career.image || null);
    } else {
      reset({
        title: '',
        content: [''],
        placement_header: '',
        email: '',
        image: null,
      });
      setCurrentImage(null);
    }
    setShowAddCareerModal(true);
  };

  const handleSaveCareer = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('placement_header', data.placement_header);
    formData.append('email', data.email);
    formData.append('content', JSON.stringify(data.content));
    if (data.image && data.image.length > 0) formData.append('image', data.image[0]);

    try {
      setLoading(true);
      await toast.promise(createCareer(formData), {
        pending: careers.length > 0 ? 'Updating career...' : 'Creating career...',
        success: careers.length > 0 ? 'Career updated!' : 'Career created!',
        error: (err) => err.response?.data?.message || 'Failed to process',
      });

      const updated = await getCareer();
      const careerData = Array.isArray(updated) ? updated : updated.data ? [updated.data] : [];
      // Normalize content
      const normalizedCareers = careerData.map(career => ({
        ...career,
        content: Array.isArray(career.content)
          ? career.content
          : typeof career.content === 'string'
            ? JSON.parse(career.content)
            : [],
      }));
      setCareers(normalizedCareers);
      reset({
        title: '',
        content: [''],
        placement_header: '',
        email: '',
        image: null,
      });
      setCurrentImage(null);
      setShowAddCareerModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process career');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="p-4 bg-white rounded-xl shadow sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#252B42] sm:text-2xl">Career Postings</h2>
          <button onClick={handleOpenModal} className="bg-[#2C473A] text-white px-4 py-2 rounded hover:bg-green-700">
            + Add/Update Career
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-green-50 rounded overflow-hidden">
            <thead className="bg-[#10172B] text-white text-left">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Placement Header</th>
                <th className="px-4 py-2">Content</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Image</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr>
              ) : careers.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8">No career postings found</td></tr>
              ) : careers.map(career => (
                <tr key={career.id || 'career'} className="border-b">
                  <td className="px-4 py-2">{career.title}</td>
                  <td className="px-4 py-2">{career.placement_header}</td>
                  <td className="px-4 py-2">
                    {Array.isArray(career.content)
                      ? career.content.join(', ').substring(0, 100) + (career.content.join(', ').length > 100 ? '...' : '')
                      : 'No content'}
                  </td>
                  <td className="px-4 py-2">{career.email}</td>
                  <td className="px-4 py-2">
                    {career.image ? <img src={career.image} alt={career.title} className="w-16 h-16 object-cover rounded" /> : 'No Image'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddCareerModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-4">
            <div className="bg-white relative p-6 rounded-xl shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                {careers.length > 0 ? 'Update Career' : 'Add Career'}
              </h3>
              <form onSubmit={handleSubmit(handleSaveCareer)}>
                <label className="block mb-2">Title*</label>
                <input type="text" className="w-full border rounded px-3 py-2 mb-4" {...register('title')} />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <label className="block mb-2">Placement Header*</label>
                <input type="text" className="w-full border rounded px-3 py-2 mb-4" {...register('placement_header')} />
                {errors.placement_header && <p className="text-red-500">{errors.placement_header.message}</p>}

                <label className="block mb-2">Email*</label>
                <input type="email" className="w-full border rounded px-3 py-2 mb-4" {...register('email')} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <label className="block mb-2">Content*</label>
                {fields.map((field, index) => (
                  <div key={field.id} className="mb-4 flex items-center gap-2">
                    <textarea
                      {...register(`content.${index}`)}
                      className="w-full border rounded px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#2C473A]"
                      placeholder={`Content ${index + 1}`}
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                        title="Remove content"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {errors.content && <p className="text-red-500">{errors.content.message}</p>}
                {errors.content?.[fields.length] && <p className="text-red-500">{errors.content[fields.length].message}</p>}
                <button
                  type="button"
                  onClick={() => append('')}
                  className="flex items-center gap-1 text-[#2C473A] hover:text-green-700 mb-4"
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Content
                </button>

                <label className="block mb-2">New Image (Optional)</label>
                <input type="file" accept="image/*" className="w-full border rounded px-3 py-2 mb-4" {...register('image')} />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCareerModal(false);
                      reset({
                        title: '',
                        content: [''],
                        placement_header: '',
                        email: '',
                        image: null,
                      });
                      setCurrentImage(null);
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2C473A] text-white px-4 py-2 rounded"
                  >
                    {careers.length > 0 ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
              <button
                onClick={() => {
                  setShowAddCareerModal(false);
                  reset({
                    title: '',
                    content: [''],
                    placement_header: '',
                    email: '',
                    image: null,
                  });
                  setCurrentImage(null);
                }}
                className="absolute top-4 right-4 text-[#060a18b9] hover:text-[#060a18]"
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

export default Career;