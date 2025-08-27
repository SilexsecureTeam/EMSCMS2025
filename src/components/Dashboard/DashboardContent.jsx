import ManagementCard from './ManagementCard';
import DashboardWidget from './DashboardWidget';
import { useNavigate } from "react-router-dom";

const DashboardContent = () => { 
  const navigate = useNavigate();

  return (
    <div className='relative p-4 z-30 md-p-12'>
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <ManagementCard title="Manage Values" onClick={() => navigate('/dashboard/values')} />
        <ManagementCard 
          title="Manage Users" 
          onClick={() => navigate('/dashboard/user-details')}
        />
        <ManagementCard title="Manage Reviews" onClick={() => navigate('/dashboard/reviews')} />
        <ManagementCard title="Manage Page Block" onClick={() => navigate('/dashboard/pageblock')} />

      </div>

      {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DashboardWidget title="Recent Activity" />
        <DashboardWidget title="System Status" />
      </div> */}

      <div className="absolute top-0 left-0 h-[145px] w-full bg-[#2C473A]"></div>
    </div>
  );
}

export default DashboardContent