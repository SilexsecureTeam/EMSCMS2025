const AnalyticsContent = () => {
    return (
      <> 
        <h2 className="text-lg font-semibold mb-4 md:text-xl">Performance Analytics</h2>
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-3 text-sm md:text-base">Student Performance</h3>
            <div className="h-48 flex items-center justify-center text-gray-400 md:h-64">
              Chart: Student Performance Metrics
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-3 text-sm md:text-base">Attendance Trends</h3>
            <div className="h-48 flex items-center justify-center text-gray-400 md:h-64">
              Chart: Monthly Attendance Trends
            </div>
          </div>
        </div>
  
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-4 text-sm md:text-base">Department Comparison</h3>
          <div className="space-y-4">
            {[
              { dept: 'Science', percentage: 86 },
              { dept: 'Mathematics', percentage: 92 },
              { dept: 'Arts', percentage: 78 },
              { dept: 'Languages', percentage: 81 },
            ].map((dept, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm md:text-base">{dept.dept}</span>
                  <span className="text-sm md:text-base">{dept.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  export default AnalyticsContent