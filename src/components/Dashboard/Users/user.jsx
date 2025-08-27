import PageManagement from "../../../hooks/management";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").nullable().notRequired(),
  password_confirmation: yup
    .string()
    .nullable()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  role: yup.string().required("Role is required"),
});

const UserDetails = () => {
  const { getAllUsers, UpdateUserDetail } = PageManagement();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState({ open: false, user: null });
  const navigate = useNavigate();

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserRole = currentUser.role;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        const userList = Array.isArray(response)
          ? response
          : response?.data && Array.isArray(response.data)
          ? response.data
          : [];
        setUsers(userList);
      } catch (error) {
        toast.error("Failed to load users");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Edit modal form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editModal.user || {},
  });

  // Open modal and set form values
  const openEditModal = (user) => {
    setEditModal({ open: true, user });
    reset(user);
  };

  const closeEditModal = () => {
    setEditModal({ open: false, user: null });
    reset({});
  };

  // Handle update (pass FormData)
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("_method", "PATCH");
      await UpdateUserDetail(editModal.user.id, formData);
      toast.success("User updated successfully");
      setEditModal({ open: false, user: null });
      reset({});
      // Refresh users
      const response = await getAllUsers();
      const userList = Array.isArray(response)
        ? response
        : response?.data && Array.isArray(response.data)
        ? response.data
        : [];
      setUsers(userList);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to update user"
      );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!users || users.length === 0) {
    return <div className="p-6 bg-white rounded-lg shadow-md">No users found.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
      <div className="mb-4">
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => navigate("/dashboard/dashboard")}
        >
          &larr; Back
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="min-w-[700px] w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">First Name</th>
            <th className="p-3 text-left">Last Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id || idx} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.firstname || "-"}</td>
              <td className="p-3">{user.lastname || "-"}</td>
              <td className="p-3">{user.email || "-"}</td>
              <td className="p-3">{user.phone || "-"}</td>
              <td className="p-3">{user.role || "-"}</td>
              <td className="p-3">
                {currentUserRole === "superadmin" && (
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => openEditModal(user)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit User</h3>
              <button
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  type="text"
                  {...register("firstname")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">{errors.firstname.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  type="text"
                  {...register("lastname")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">{errors.lastname.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="text"
                  {...register("phone")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1">Confirm Password</label>
                <input
                  type="password"
                  {...register("password_confirmation")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1">Role</label>
                <select
                  {...register("role")}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select role</option>
                  <option value="user">User</option>
                  <option value="superadmin">Superadmin</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;