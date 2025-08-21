const DashboardWidget = ({ title, children }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow md:p-6">
        <h3 className="font-medium text-base mb-4 md:text-lg">{title}</h3>
        <div className="bg-gray-50 rounded border">
          {children || (
            <div className="h-48 flex items-center justify-center text-gray-400">
              Widget Content Area
            </div>
          )}
        </div>
      </div>
    );
  }

  export default DashboardWidget