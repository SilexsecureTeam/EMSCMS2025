const SettingsContent = () => {
    return (
      <> 
        <h2 className="text-lg font-semibold mb-4 md:text-xl">System Settings</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-1">
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <h3 className="font-medium mb-3 text-sm md:text-base">Settings Categories</h3>
              <div className="space-y-2">
                {[
                  { name: 'General', active: true },
                  { name: 'Notifications' },
                  { name: 'Security' },
                  { name: 'Permissions' },
                  { name: 'Integrations' },
                  { name: 'Backup & Restore' },
                ].map((category, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded cursor-pointer text-sm md:text-base ${
                      category.active
                        ? 'bg-green-100 text-green-800 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium mb-4 text-sm md:text-base">General Settings</h3>
              <div className="space-y-4">
                {[
                  { label: 'Institution Name', value: 'Springfield Academy', type: 'text' },
                  {
                    label: 'Address',
                    value: '123 Education St, Springfield',
                    type: 'text',
                  },
                  { label: 'Contact Email', value: 'admin@springfield.edu', type: 'email' },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block mb-1 font-medium text-xs md:text-sm">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      className="w-full px-4 py-2 border rounded text-sm md:text-base"
                      value={field.value}
                    />
                  </div>
                ))}
                <div>
                  <label className="block mb-1 font-medium text-xs md:text-sm">
                    Academic Year
                  </label>
                  <select className="w-full px-4 py-2 border rounded text-sm md:text-base">
                    <option>2024-2025</option>
                    <option>2025-2026</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-xs md:text-sm">
                    Time Zone
                  </label>
                  <select className="w-full px-4 py-2 border rounded text-sm md:text-base">
                    <option>Eastern Time (ET)</option>
                    <option>Pacific Time (PT)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-2">
                  <button className="bg-green-700 text-white px-4 py-2 rounded text-sm md:text-base">
                    Save Changes
                  </button>
                  <button className="bg-gray-200 px-4 py-2 rounded text-sm md:text-base">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default SettingsContent