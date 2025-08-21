// DashboardPage.jsx
import { SidebarProvider } from '../context/SidebarContext';
import Sidebar from '../components/Dashboard/Sidebar';
import HeaderDashboard from '../components/Dashboard/HeaderDashboard';
import MainContent from '../components/Dashboard/MainContent';

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white overflow-auto">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <HeaderDashboard />
          <MainContent />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;