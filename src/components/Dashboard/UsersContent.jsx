const UsersContent = () => { 
    return (
      <>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 md:text-xl">User Management</h2>
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
              <input
                type="text"
                placeholder="Search users..."
                className="px-4 py-2 border rounded w-full md:w-1/2"
              />
              <button className="bg-green-700 text-white px-4 py-2 rounded">
                Add New User
              </button>
            </div>
  
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 text-sm md:text-base">Name</th>
                    <th className="text-left p-3 text-sm md:text-base">Role</th>
                    <th className="text-left p-3 text-sm md:text-base">Status</th>
                    <th className="text-left p-3 text-sm md:text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'John Smith', role: 'Teacher', status: 'Active' },
                    { name: 'Emma Johnson', role: 'Administrator', status: 'Active' },
                    { name: 'Michael Davis', role: 'Student', status: 'Inactive' },
                  ].map((user, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3 text-sm md:text-base">{user.name}</td>
                      <td className="p-3 text-sm md:text-base">{user.role}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button className="text-blue-600 text-sm">Edit</button>
                        <button className="text-red-600 text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default UsersContent