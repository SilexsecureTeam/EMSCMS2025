import ManagementCard from './ManagementCard';
import DashboardWidget from './DashboardWidget';

const DashboardContent = () => { 
  return (
    <div className='relative p-4 z-30 md-p-12'>
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <ManagementCard title="Manage Site" active={true} />
        <ManagementCard title="Manage Users" />
        <ManagementCard title="Manage Content" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DashboardWidget title="Recent Activity" />
        <DashboardWidget title="System Status" />
      </div>

      <div className="absolute top-0 left-0 h-[145px] w-full bg-[#2C473A]"></div>
    </div>
  );
}

export default DashboardContent