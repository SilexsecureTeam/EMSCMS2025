import React, { useEffect, useState } from 'react';
import { Eye, Trash2, X } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import PageManagement from '../../hooks/management';

const StaffManagement = () => {
  const { getAllHires, getHireById, deleteStaff } = PageManagement();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [staffToDeleteId, setStaffToDeleteId] = useState(null);

  // Function to fetch all staff members
  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await getAllHires();
      const staffData = Array.isArray(data.data) ? data.data : data.data ? [data.data] : [];
      setStaffList(staffData);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load staff list');
      setStaffList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Function to open the details modal
  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
    setShowDetailsModal(true);
  };

  // Function to open the delete confirmation modal
  const confirmDelete = (id) => {
    setStaffToDeleteId(id);
    setShowDeleteModal(true);
  };

  // Function to handle the actual deletion after confirmation
  const handleDeleteStaff = async () => {
    try {
      await toast.promise(
        deleteStaff(staffToDeleteId),
        {
          pending: 'Deleting staff member...',
          success: 'Staff member deleted successfully!',
          error: (err) => err.response?.data?.message || err.message || 'Failed to delete staff member',
        }
      );
      fetchStaff(); // Refresh the list after deletion
      setShowDeleteModal(false);
      setStaffToDeleteId(null);
    } catch (error) {
      console.error("Deletion error:", error);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-8">
      <Toaster />
      <div className="p-4 bg-white rounded-xl shadow sm:p-6">
        <div className="flex flex-col justify-between items-start mb-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold text-[#252B42] sm:text-2xl">Staff Management</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-green-50 rounded table-auto">
            <thead className="bg-[#10172B] text-white font-medium text-sm sm:text-base text-left">
              <tr>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2 text-center">Experience</th>
                <th className="px-4 py-2 text-center min-w-[120px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">Loading staff data...</td>
                </tr>
              ) : staffList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">No staff members found.</td>
                </tr>
              ) : (
                staffList.map((staff) => (
                  <tr key={staff.id} className="border-b">
                    <td className="px-4 py-2">{staff.first_name}</td>
                    <td className="px-4 py-2">{staff.last_name}</td>
                    <td className="px-4 py-2">{staff.email}</td>
                    <td className="px-4 py-2">{staff.phone}</td>
                    <td className="px-4 py-2 capitalize">{staff.staff_category}</td>
                    <td className="px-4 py-2 text-center">{staff.years_of_experience}</td>
                    <td className="px-4 py-2 text-center min-w-[120px]">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(staff)}
                          className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded hover:bg-blue-700"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDelete(staff.id)}
                          className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded hover:bg-red-700"
                          title="Delete Staff"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Staff Details Modal */}
        {showDetailsModal && selectedStaff && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-4">
            <div className="bg-white relative p-6 rounded-xl shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-b-[#060a1860]">
                Staff Details
              </h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Name:</strong> {selectedStaff.first_name} {selectedStaff.last_name}</p>
                <p><strong>Email:</strong> {selectedStaff.email}</p>
                <p><strong>Phone:</strong> {selectedStaff.phone}</p>
                <p><strong>Category:</strong> {selectedStaff.staff_category}</p>
                <p><strong>Experience:</strong> {selectedStaff.years_of_experience} years</p>
                <p><strong>Address:</strong> {selectedStaff.address}, {selectedStaff.city}, {selectedStaff.zip_code}, {selectedStaff.country}</p>
                {selectedStaff.interest_reason && <p><strong>Interest Reason:</strong> {selectedStaff.interest_reason}</p>}
              </div>
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                onClick={() => setShowDetailsModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
              <p className="mb-4">Are you sure you want to delete this staff member? This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setStaffToDeleteId(null);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteStaff}
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

export default StaffManagement;
