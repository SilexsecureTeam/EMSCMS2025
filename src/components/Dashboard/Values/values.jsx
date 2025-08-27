import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import PageManagement from "../../../hooks/management";

// Editor Toolbar Component
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
  </div>
);

// Icon options for dropdown
const iconOptions = [
  { value: "fa-heart", label: "Heart", icon: "♥" },
  { value: "fa-star", label: "Star", icon: "★" },
  { value: "fa-check", label: "Check", icon: "✓" },
  { value: "fa-home", label: "Home", icon: "🏠" },
  { value: "fa-user", label: "User", icon: "👤" },
  { value: "fa-globe", label: "Globe", icon: "🌍" },
  { value: "fa-lightbulb", label: "Light Bulb", icon: "💡" },
  { value: "fa-shield", label: "Shield", icon: "🛡️" },
  { value: "fa-handshake", label: "Handshake", icon: "🤝" },
  { value: "fa-target", label: "Target", icon: "🎯" },
];

// Validation schema
const schema = yup.object().shape({
  icon: yup.string().required("Icon is required"),
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

const VALUES_PER_PAGE = 5;

const ValuesPage = () => {
  const { createValues, getValues, updateValue, deleteValues, getValueById } = PageManagement();
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingValue, setEditingValue] = useState(null);
  const [page, setPage] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      icon: "",
      title: "",
      content: "",
    },
  });

  const fetchValues = async () => {
    try {
      setLoading(true);
      const response = await getValues();
      const valueList = Array.isArray(response)
        ? response
        : response?.data && Array.isArray(response.data)
          ? response.data
          : [];
      setValues(valueList);
    } catch (error) {
      toast.error("Failed to load values");
      setValues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValues();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editingValue) {
        await updateValue(editingValue.id, data);
        toast.success("Value updated successfully");
      } else {
        await createValues(data);
        toast.success("Value created successfully");
      }
      reset();
      setShowModal(false);
      setEditingValue(null);
      fetchValues();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to save value"
      );
    }
  };

  const handleEdit = async (id) => {
    try {
      const value = await getValueById(id);
      setEditingValue(value);
      setValue("icon", value.icon);
      setValue("title", value.title);
      setValue("content", value.content);
      setShowModal(true);
    } catch (error) {
      toast.error("Failed to fetch value details");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this value?")) return;
    try {
      await deleteValues(id);
      toast.success("Value deleted successfully");
      fetchValues();
    } catch (error) {
      toast.error(error || "Failed to delete value");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingValue(null);
    reset();
  };

  // Pagination logic
  const totalPages = Math.ceil(values.length / VALUES_PER_PAGE);
  const paginatedValues = values.slice(
    (page - 1) * VALUES_PER_PAGE,
    page * VALUES_PER_PAGE
  );

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Icon</label>
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select an icon</option>
              {iconOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          )}
        />
        {errors.icon && (
          <p className="text-red-500 text-sm">{errors.icon.message}</p>
        )}
      </div>
      
      <div>
        <label className="block mb-1">Title</label>
        <input
          type="text"
          {...register("title")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      
      <div>
        <label className="block mb-1">Content</label>
        <EditorToolbar />
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full border px-3 py-2 rounded"
              rows={5}
              placeholder="Write your content here..."
            />
          )}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        className="bg-[#2C473A] text-white px-4 py-2 rounded w-full mt-2 font-semibold hover:bg-[#1e3226]"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : editingValue ? "Update Value" : "Create Value"}
      </button>
    </form>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <button
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mb-4"
        onClick={() => window.location.href = "/dashboard/dashboard"}
      >
        &larr; Back
      </button>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Values</h2>
        <button
          className="bg-[#2C473A] text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Value
        </button>
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : values.length === 0 ? (
        <div>No values found.</div>
      ) : (
        <>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Icon</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Content</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedValues.map((value, idx) => (
                <tr key={value.id || idx} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <span className="text-2xl">
                      {iconOptions.find(icon => icon.value === value.icon)?.icon || "📄"}
                    </span>
                  </td>
                  <td className="p-3">{value.title || "-"}</td>
                  <td className="p-3">
                    <div className="max-w-xs truncate">
                      {value.content || "-"}
                    </div>
                  </td>
                  <td className="p-3">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleEdit(value.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(value.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-800"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 rounded ${page === idx + 1 ? "bg-[#2C473A] text-white" : "bg-gray-200 text-gray-800"}`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-800"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Value Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingValue ? "Edit Value" : "Add Value"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            {formContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default ValuesPage;